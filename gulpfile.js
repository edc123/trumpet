// Watch and Compile .scss from /src/scss

'use strict'

const autoprefixer = require('gulp-autoprefixer')
	, beep = require('beeper')
	, gulp = require('gulp')
	, livereload = require('gulp-livereload')
	, nodemon = require('gulp-nodemon')
	, plumber = require('gulp-plumber')
	, sass = require('gulp-sass')
	, sourcemaps = require('gulp-sourcemaps')

// Paths
const paths = {
	sass: [
		'src/scss/*.scss',
		'src/scss/**/*.scss',
	],
	views: [
		'views/**/*.pug',
		'public/img/**/*.*',
		'public/js/**/*.js'
	]
}

const onError = (err) => {
	console.log(err)
}

gulp.task('serve', () => {
	nodemon({script: 'index.js'})
})

gulp.task('sass', () => {
	beep()
	gulp
		.src(paths.sass[0])
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write('./public/css/map'))
		.pipe(autoprefixer())
		.pipe(gulp.dest('public/css'))
		.pipe(livereload())
})

gulp.task('view', () => {
	beep()
	gulp
		.src(paths.views)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(livereload())
})

gulp.task('watch', () => {
	livereload.listen({auto: false})
	gulp.watch(paths.sass[1], ['sass'])
	gulp.watch(paths.views, ['view'])
})

gulp.task('default', ['view', 'sass', 'serve', 'watch'])