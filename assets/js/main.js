// (function(window, document, $) {

        var slideIndex = 0;
        var dados = 0;
        var voz = 0;

        function bindButton() {
            $('.positive-button').unbind('click').one("click", function (e) {

                if (slideIndex === 0 || slideIndex == 2 || slideIndex == 3  || slideIndex == 5 || slideIndex == 6 || slideIndex == 8){
                    dados++;
                    //console.log('Dados = ' + dados);

                } else if (slideIndex == 4){
                    //console.log('Não tem pontuação');

                } else if (slideIndex == 1 || slideIndex == 7 || slideIndex == 9){
                    voz++;
                    //console.log('Voz = ' + voz);
                }
                nextSlide(e.target);

        });

            $('.negative-button').unbind('click').one("click", function (e) {
            nextSlide(e.target);
            });
        }



        //Começa o Simulador
        function starter(){
            
            // Google Tag Manager(GTM)
    //        ga('send', 'GAInteraction', 'Controle', 'Navegacao', 'começa-simulador-combina');
    //       dataLayer.push({'event' : 'GAInteraction' , 'eventoCategoria' : 'Controle' , 'eventoAcao' : 'Navegacao' , 'eventoRotulo' : 'começa-simulador-combina'});

            dados = 0;
            voz = 0;
            $("#home").fadeOut('slow');
            $('#whatsapp-tim-tim').fadeOut();
            $('#controle-whatsapp').fadeOut();
            $('#liberty-controle').fadeOut();

            setTimeout(function(){
                $('#cinema').fadeIn();
                $('.thumbs').fadeIn();
            },500);

            $('.icons-cinema-check-icon').addClass('icons-cinema-pb-icon').removeClass('icons-cinema-check-icon');
            $('.icons-bomba-check-icon').addClass('icons-bomba-pb-icon').removeClass('icons-bomba-check-icon');
            $('.icons-wi-fi-check-icon').addClass('icons-wi-fi-pb-icon').removeClass('icons-wi-fi-check-icon');
            $('.icons-whatsapp-check-icon').addClass('icons-whatsapp-pb-icon').removeClass('icons-whatsapp-check-icon');
            $('.icons-viajar-check-icon').addClass('icons-viajar-pb-icon').removeClass('icons-viajar-check-icon');
            $('.icons-navegar-check-icon').addClass('icons-navegar-pb-icon').removeClass('icons-navegar-check-icon');
            $('.icons-ovo-check-icon').addClass('icons-ovo-pb-icon').removeClass('icons-ovo-check-icon');
            $('.icons-sonho-check-icon').addClass('icons-sonho-pb-icon').removeClass('icons-sonho-check-icon');
            $('.icons-colecao-check-icon').addClass('icons-colecao-pb-icon').removeClass('icons-colecao-check-icon');
            $('.icons-orelha-icon').addClass('icons-orelha-pb-icon').removeClass('icons-orelha-icon');
            $('.icons-cinema-pb-icon').addClass('icons-cinema-icon').removeClass('icons-cinema-pb-icon');
            bindButton();
        }

        function nextSlide(targetElement) {
            
    //        var url = (window.location != window.parent.location) ? document.referrer: document.location;
    //        url = url.href;
    //        console.log(url);
    //        var pathArray = url.split('/');
    //        var uf = pathArray[1];
            
            var uf = $('.combina-wrapper').attr("data-uf");
            var slideList = $('.choose');

            if (slideIndex >= slideList.length - 1) {

                $('#orelha').fadeOut('fast', function() {
                    slideIndex = 0;

                    $('.thumbs').fadeOut();

                    if (dados === 0 && voz === 0 || dados >= 3 && voz >= 2 || dados == voz){
                        $('#whatsapp-tim-tim').fadeIn();
                        $("#link-tcwt").attr('href', 'http://combina.timcontrole.com/?uf=' + uf + '&plano=tcwt&utm_source=tim');


                    } else if (dados > voz){
                        $('#controle-whatsapp').fadeIn();
                        $("#link-tcwa").attr('href', 'http://combina.timcontrole.com/?uf=' + uf + '&plano=tcwa&utm_source=tim');

                    } else if (voz > dados){
                        $('#liberty-controle').fadeIn();
                        $("#link-tc32").attr('href', 'http://combina.timcontrole.com/?uf=' + uf + '&plano=tc32&utm_source=tim');
                    }
                });
                return;
            }

            var curSection = $(targetElement).closest('section');
            var id = slideList[slideIndex + 1].id;
            var parentSection = curSection[0].id;
            //console.log(parentSection);

            curSection.fadeOut('slow', function() {
                $('#' + id).fadeIn();
                $('.icons-' + curSection.attr('id') + '-icon')
                .addClass('icons-' + curSection.attr('id') + '-check-icon')
                .removeClass('icons-' + curSection.attr('id') + '-icon');
                $('.icons-' + id + '-pb-icon')
                .addClass('icons-' + id + '-icon')
                .removeClass('icons-' + id + '-pb-icon');
           });
            slideIndex++;
            //console.log(slideIndex);      
        }

    $(document).ready(function() {

            var br = document.createElement("br");
            var libertyValor = document.createElement("p");
            var todoBrasil = "R$32,90";
            var regiaoRS = "R$22,90";
            var libertyValorConteudo = document.createTextNode( todoBrasil + '/Mês | R$10 em créditos');
            var libertyValorConteudo2 = document.createTextNode('ligações ilimitadas de TIM P/ TIM (local e LD)');
            var regionalizacao = window.location.href;

            if (regionalizacao.indexOf("rs") > -1){
                libertyValorConteudo = document.createTextNode( regiaoRS + '/Mês | R$10 em créditos');
            }

            libertyValor.className = "blue-text";
            libertyValor.appendChild(libertyValorConteudo);
            libertyValor.appendChild(br);
            libertyValor.appendChild(libertyValorConteudo2);
            var currentIframe = $('#combina');
            currentIframe.contents().find('#liberty-valor').append(libertyValor);
        
            var url = (window.location != window.parent.location) ? document.referrer: document.location;
            url = url.href;
    //        console.log(url);
            var pathArray = url.split('/');
            var uf = pathArray[1];
            currentIframe.contents().find('.combina-wrapper').attr('data-uf', uf);
    //        var libertyControle = window.frames['combina'].document.getElementById("liberty-valor");
    //        libertyControle.appendChild(libertyValor);
    });
    // return (this);
 // })(window, document, jQuery);


