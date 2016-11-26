var gulp = require("gulp");
var jade = require("gulp-jade");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var filter = require("gulp-filter");
var replace = require("gulp-replace");
var watch = require("gulp-watch");
var es = require('event-stream');
//var jslint = require("gulp-jslint");
//var recess = require("gulp-recess");

var dir = {
    assets: "assets/",
    src: "src/",
    dest: "dest/",
    bower: "bower_components/"
};

var usecdn = true;

gulp.task("js", function() {
    es.concat(
            gulp.src(dir.src + dir.assets + "js/**/*.js")
    )
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dest + dir.assets + "js/"));
});

gulp.task("jade", function () {
    var locations = [
        {
            src: "*.jade",
            dest: ""
        },
        {
            src: "templates/**/*jade",
            dest: "templates/"
        }
    ];
    for(var i = 0; i < locations.length; i++) {
        gulp.src(dir.src + locations[i].src)
            .pipe(plumber())
            .pipe(jade({
                pretty: true,
                doctype: "HTML",
                locals: { cdn: usecdn }
            }))
            .pipe(gulp.dest(dir.dest + locations[i].dest));
    }
});

gulp.task("less", function() {
    gulp.src(dir.src + dir.assets + "less/master.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dest + dir.assets + "css/"));
});

gulp.task("css", function() {
    gulp.src(dir.src + dir.assets + "css/**/*.css")
        .pipe(gulp.dest(dir.dest + dir.assets + "css/"));
});

gulp.task("bower_components", function() {
    if (!usecdn)
    {
        bootswatchfilter = filter(dir.bower + "/bootstrap-theme-bootswatch-flatly/css/*.css",
                                  {restore: true});
        gulp.src(dir.bower + "/**/*")
            .pipe(bootswatchfilter)
            .pipe(replace("//fonts.googleapis.com/css?family=Lato:400,700,400italic",
                          "../../lato-font/css/lato-font.min.css"))
            .pipe(bootswatchfilter.restore)
            .pipe(gulp.dest(dir.dest + "bower_components/"));
    }
});

gulp.task("fallback", function() {
    if (!usecdn)
    {
        gulp.src(dir.src + "fallback/**/*")
            .pipe(gulp.dest(dir.dest + "fallback/"));
    }
});


gulp.task("compile", ["jade", "js", "less", "css", "bower_components", "fallback"]);

gulp.task("default", ["jade", "js", "less", "css", "bower_components", "fallback"], function() {
    gulp.watch(dir.src + dir.assets + "js/**/*.js", function() {
        gulp.run("js");
    });
    gulp.watch(dir.src + dir.assets + "less/**/*.less", function() {
        gulp.run("less");
    });
    gulp.watch(dir.src + "/**/*.jade", function() {
        gulp.run("jade");
    });
    gulp.watch(dir.src + dir.assets + "css/**/*.css", function() {
        gulp.run("css");
    });
    gulp.watch(dir.src + "../bower_components/**/*", function() {
        gulp.run("bower_components");
    });
    gulp.watch(dir.src + "../fallback/**/*", function() {
        gulp.run("fallback");
    });
});
