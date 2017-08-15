var gulp = require('gulp')
var gutil        = require('gulp-util');

var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')

var browserify = require('gulp-browserify')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')


var cache = require('gulp-cache')
var imagemin = require('gulp-imagemin')

var rename = require('gulp-rename')
var clean = require('gulp-clean')



// CSS
gulp.task('compile-css', ['clean-css'], function(){
    return gulp
    .src('src/css/style.scss')
    .pipe(sass())
    .on('error',function(err){
        gutil.log(
            gutil.colors.red("SASS compile error:"), 
            err.message,
            gutil.colors.red(err)
        );
        // end this stream
        this.emit('end');
    }) 
    .pipe(gulp.dest('dist/css'))
})

gulp.task('clean-css', function() {
    return gulp
        .src('dist/css')
        .pipe(clean())
})
gulp.task('build-css', ['clean-css', 'compile-css'])

// Javascript
gulp.task('compile-javascript', ['clean-javascript'], function(){
    return gulp
    .src([
        'src/js/jquery*.js',
        'src/js/bootstrap*.js',
        
        //'src/js/**/*.js',

        'src/js/app.js'
    ])
    //.pipe(browserify())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('clean-javascript', function() {
    return gulp
        .src('dist/js')
        .pipe(clean())
})
gulp.task('build-javascript', ['clean-javascript', 'compile-javascript'])


// Fonts
gulp.task('move-fonts', ['clean-fonts'], function() {
    return gulp
        .src(['src/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean-fonts', function() {
    return gulp
        .src('dist/fonts')
        .pipe(clean())
})

gulp.task('build-fonts', ['clean-fonts', 'move-fonts'])



// Images
gulp.task('optimize-images', ['clean-images'], function() {
    return gulp
    .src('src/images/**/*')
    .pipe(cache(imagemin({ 
        optimizationLevel: 3, 
        progressive: true, interlaced: true 
    })))
    .pipe(gulp.dest('dist/images'))
})

gulp.task('clean-images', function() {
    return gulp
        .src('dist/images')
        .pipe(clean())
})

gulp.task('build-images', ['clean-images', 'optimize-images'])



// FAVICON
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: 'src/images/favicon.png',
        dest: 'dist/images',
        iconsPath: 'dist/images',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#000000',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 50,
                themeColor: '#000000'
            }
        },
        settings: {
            compression: 5,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});


// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('build-favicon', ['generate-favicon'])

gulp.task('build',[
    'build-css', 
    'build-javascript', 
    'build-fonts',
    'build-images',
    'build-favicon'
])

gulp.task('default', [
    'build',
    'watch'
])

gulp.task('watch', function(){
    gulp.watch('src/css/**/*.scss', ['compile-css'])
    gulp.watch('src/js/**/*.js', ['compile-javascript'])
    gulp.watch('src/images/**/*.*', ['build-images'])
})

// To close on CTRL+C
process.on('SIGINT', function() {
  setTimeout(function() {
    gutil.log(gutil.colors.red('Successfully closed ' + process.pid));
    process.exit(1);
  }, 500);
});