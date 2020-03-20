var gulp = require("./node_modules/gulp");
var browserSync = require("./node_modules/browser-sync").create();
var sass = require("./node_modules/gulp-sass");
var cleanCSS = require("./node_modules/gulp-clean-css");
var rename = require("./node_modules/gulp-rename");

gulp.task("default", ["serve"]);

gulp.task("compile:sass", function() {
  return gulp
    .src("styles/scss/shards-dashboards.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(rename({ suffix: "." + require("./package.json.js.js").version }))
    .pipe(gulp.dest("./styles"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./styles"))
    .pipe(browserSync.stream());
});

gulp.task("compile", ["compile:sass"]);

gulp.task("serve", ["compile"], function() {
  browserSync.init({ server: "." });
  gulp.watch("styles/**/*.scss", ["compile:sass"]);
});
