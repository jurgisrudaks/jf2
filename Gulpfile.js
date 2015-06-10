var gulp = require('gulp'),
    compass = require('gulp-compass'),
    scsslint = require('gulp-scsslint'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    handlebars = require('gulp-handlebars'),
    declare = require('gulp-declare'),
    amdOptimize = require("amd-optimize"),
    wrap = require('gulp-wrap'),
    merge = require('merge-stream');


gulp.task('jshint', function () {
    return gulp.src(['app/*.js', 'app/modules/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function() {
    return gulp.src(['app/styles/*.scss', 'app/modules/**/scss/*.scss'])
    .pipe(scsslint('scss-lint.yml'))
    .pipe(scsslint.reporter());
});

gulp.task('templates', function () {
    return gulp.src(['app/templates/*.hbs', 'app/modules/**/*.hbs'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'JST',
        noRedeclare: true,
    }))
    .pipe(concat('templates.js'))
    .pipe(wrap('define(["handlebars"], function(Handlebars) {<%= contents %> return this["JST"]; });'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('mainJs', ['jshint', 'templates'], function() {

    var almond = gulp.src("bower_components/almond/almond.js");

    var main = amdOptimize.src("main", {
        baseUrl: 'app',
        configFile: 'app/config.js'
    });

    var modules = gulp.src('app/modules/**/*.js');

    return merge(almond, main, modules)
    .pipe(concat("source.js"))
    .pipe(gulp.dest('build/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('deploy/js'));
});

gulp.task('sass', ['scss-lint'], function() {
    return gulp.src(['app/styles/*.scss', 'app/modules/**/scss/style.scss'])
    .pipe(compass({
        project: __dirname,
        css: 'build/css/source',
        sass: 'app'
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('deploy/css'));
});

gulp.task('copy', function() {
    var index = gulp.src('app/index.html')
    .pipe(gulp.dest('deploy'));

    var api = gulp.src(['app/api/**/*', 'app/api/**/.??*'])
    .pipe(gulp.dest('deploy/api'));

    var fonts = gulp.src('bower_components/fontawesome/fonts/*')
    .pipe(gulp.dest('deploy/fonts'));

    return merge(index, api, fonts);
});

gulp.task('clean', function(cb) {
    return del(['deploy', 'build'], cb);
});

gulp.task('dev', function () {
    gulp.watch('app/**/*.{js,hbs}', {debounceDelay: 10000}, function(file){
        console.log(file.path + ' ' + file.type);
        gulp.start('mainJs');
    });
    gulp.watch('app/**/*.scss', {debounceDelay: 10000}, function(file){
        console.log(file.path + ' ' + file.type);
        gulp.start('sass');
    });
});

gulp.task('build', ['clean'], function() {
    return gulp.start('sass', 'mainJs', 'copy');
});

gulp.task('default', ['build']);
