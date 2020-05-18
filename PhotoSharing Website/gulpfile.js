const 
// Modules
gulp = require('gulp'), 
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
// folders
src='src/';

function css() {
    const out = src + 'css/';
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(out))
        .pipe(browserSync.stream());
} 

function js() {
    const out = src + 'js/';
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/tether/dist/js/tether.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(out))
        .pipe(browserSync.stream());
}

function watch (done) {
    gulp.watch(src + 'css/**/*', css);
    gulp.watch(src + 'js/**/*', js);
    gulp.watch(src + '*.html', function(){
        browserSync.init({
            server: src
        });
    });
    gulp.watch(src + '*.html').on('change', browserSync.reload)
    done();
}

exports.js = js;
exports.css = css;
exports.watch = watch;

// Build
exports.build = gulp.parallel(exports.js, exports.css);

// Default  S3cureP@ssw0rd1990
exports.default = gulp.series(exports.build, exports.watch);