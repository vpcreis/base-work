var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var rev = require('gulp-rev');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var server = require('gulp-server-livereload');
//gutil.log(gutil.colors.cyan('GULP IS WATCHING FOR CHANGES'));

// Gulp Default task to be performed.
gulp.task('default',[
	'usemin',
	'sass',
	'imagemin',
	'fonts',
	'lint',
	// 'scripts',  
	// 'minify-css'
]);

// USEMIN MINIFY CSS / CONCAT AND UGLIFY JS

gulp.task('usemin', function () {
    return gulp.src('./assets/*.html')
	  	.pipe(usemin({
		    css: [minifyCSS(), 'concat'],
		    html: [minifyHtml({empty: false})],
		    js: [uglify(), rev()] // rev() "versiona o arquivo no destino criando um hash".
	  	}))
	  .pipe(gulp.dest('./dist/Portal_Conteudo/_staticfiles/para-voce/planos/controle/'));
});


// // JAVASCRIPT
// gulp.task('scripts', function() {
//  return gulp.src('./assets/js/**/*.js')
//   .pipe(uglify())
//   .pipe(concat('all.js'))
//   .pipe(gulp.dest('./dist/js'));
// });

// SASS TASK
gulp.task('sass', function () {
	return gulp.src('./assets/scss/*.scss')
		.pipe(sass({
			errLogToConsole: true
        }))
		//ADD VENDOR PREFIX BASED ON CANIUSE
		.pipe(autoprefixer({
		    browsers: ('last 2 versions', '> 1%')
		    }))
		.pipe(gulp.dest('./assets/css'))
		.pipe(livereload()); // Espera atualização de arquivo para modificar instantaneamente no browser sem precisar de F5.
});

// // MINIFY CSS
// gulp.task('minify-css', function(){
// 	return gulp.src('./assets/css/*.css')
// 	.pipe(minifyCSS({keepBreaks:false}))
// 	.pipe(concat('style.css'))
// 	.pipe(gulp.dest('./dist/css'))
// });

// IMAGE COMPRESSION
gulp.task('imagemin', function () {
    return gulp.src('./assets/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/Portal_Conteudo/_staticfiles/para-voce/planos/controle/img'));
});

gulp.task('fonts', function(){
	return gulp.src('./assets/fonts/*')
	.pipe(gulp.dest('./dist/Portal_Conteudo/_staticfiles/para-voce/planos/controle/fonts'));
});

// Degug Javascript
gulp.task('lint', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Roda um servidor local que funciona com o Livereload
gulp.task('webserver', function() {
  gulp.src('assets')
    .pipe(server({
      livereload: true,
      // directoryListing: true,
      // host: '0.0.0.0',
      // port:8000,
      defaultFile: 'index.html',
      open: true
    }));
});

//WATCH
gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('./assets/**/*.scss', ['sass']);
});

