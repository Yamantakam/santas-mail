const gulp = require("gulp"),
      sync = require("browser-sync").create(),
      log = require("fancy-log"),
      del = require("del"),
      rename = require("gulp-rename"),
      rigger = require("gulp-rigger"),
      newer = require("gulp-newer"),
      plumber = require("gulp-plumber"),
      less = require("gulp-less"),
      postcss = require("gulp-postcss"),
      prefixer = require("autoprefixer"),
      mqpacker = require("css-mqpacker"),
      sourcemaps = require("gulp-sourcemaps"),
      csso = require("gulp-csso"),
      htmlmin = require("gulp-htmlmin"),
      uglifyes = require("uglify-es"),
      composer = require("gulp-uglify/composer"),
      uglify = composer(uglifyes, console),
      eslint = require("gulp-eslint"),
      imagemin = require("gulp-imagemin"),
      spritesmith = require("gulp.spritesmith"),
      svgmin = require("gulp-svgmin"),
      svgstore = require("gulp-svgstore"),
      ghPages = require("gh-pages");

let path = {
  src:{
    html: "src/*.html",
    less: "src/less/style.less",
    js: "src/js/main.js",
    img: ["!src/img/icons/**/*.*", "src/img/**/*.*"],
    sprite: "src/img/icons/*.png",
    spritesvg: "src/img/icons/*.svg",
    fonts: "src/fonts/**/*.{woff,woff2}"
  },
  
  build:{
    html: "build/",
    css: "build/css/",
    js: "build/js/",
    img: "build/img/",
    fonts: "build/fonts/"
  },

  watch:{
    html: "src/*.html",
    less: "src/less/**/*.less",
    js: "src/js/**/*.js",
    img: ["!src/img/icons/**/*.*", "src/img/**/*.*"],
    sprite: "src/img/icons/*.png",
    spritesvg: "src/img/icons/*.svg",
    fonts: "src/fonts/**/*.{woff,woff2}"
  },

  clean: ["build/**/*.*"],
  deploy: "build/"
};

let configSync = {
	server: "build",
  notify: false,
  cors: true,
  browser: ["chrome.exe"]
};



gulp.task("html", function() {
  return gulp.src(path.src.html)
  .pipe(newer(path.build.html))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(path.build.html))
  .pipe(sync.stream());
});



gulp.task("style", function() {
  return gulp.src(path.src.less)
  .pipe(sourcemaps.init())
  .pipe(plumber(function(error) {
    log(error);
    this.emit("end");
  }))
  .pipe(less())
  .pipe(postcss([
    prefixer({overrideBrowserslist: ["last 5 versions"]}),
    mqpacker({sort: true})
  ]))
  .pipe(gulp.dest(path.build.css))
  .pipe(csso())
  .pipe(rename({suffix: ".min"}))
  .pipe(sourcemaps.write("maps"))
  .pipe(gulp.dest(path.build.css))
  .pipe(sync.stream());
});



gulp.task("js", function() {
  return gulp.src(path.src.js)
  .pipe(rigger())
  .pipe(gulp.dest(path.build.js))
  .pipe(rename({ suffix:".min"}))
  .pipe(uglify())
  .pipe(gulp.dest(path.build.js))
  .pipe(sync.stream());
});



gulp.task("jslint", function() {
  return gulp.src(path.src.js, {base: "./"})
  .pipe(eslint({fix: true}))
  .pipe(eslint.format())
  .pipe(gulp.dest("./"))
});



gulp.task("images", function() {
  return gulp.src(path.src.img)
  .pipe(newer(path.build.img))
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true})
  ]))
  .pipe(gulp.dest(path.build.img))
  .pipe(sync.stream());
});



gulp.task("sprite", function(done) {
  let spriteData =
    gulp.src(path.src.sprite)
    .pipe(spritesmith({
      imgName: "sprite.png",
      imgPath: "../img/" + "sprite.png",
      cssName: "sprite.less",
      cssFormat: "less",
      algorithm: "binary-tree",
      padding: 5,
      cssVarMap: function (sprite) {
        sprite.name = "icon__" + sprite.name
      },
    }));
  spriteData.img.pipe(gulp.dest("src/img/"))
  spriteData.css.pipe(gulp.dest("src/less/"))
  .pipe(sync.stream())
  done();
});



gulp.task("spritesvg", function() {
  return gulp.src(path.src.spritesvg)
  .pipe(svgmin({
    plugins: [{removeViewBox: false}]
    }))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest(path.build.img))
  .pipe(sync.stream());
});



gulp.task("fonts", function() {
  return gulp.src(path.src.fonts)
  .pipe(newer(path.build.fonts))
  .pipe(gulp.dest(path.build.fonts))
  .pipe(sync.stream());
});



gulp.task("clean", function() {
  return del(path.clean, {read: false});
});



gulp.task("build", gulp.series("clean", "html", "style", "js", "images", "spritesvg", "fonts"));



gulp.task("observer", function() {
  sync.init(configSync);
  gulp.watch(path.watch.html, gulp.series("html"));
  gulp.watch(path.watch.less, gulp.series("style"));
  gulp.watch(path.watch.js, gulp.series("js"));
  gulp.watch(path.watch.img, gulp.series("images"));
  gulp.watch(path.watch.spritesvg, gulp.series("spritesvg"));
  gulp.watch(path.watch.fonts, gulp.series("fonts"));
});



gulp.task("deploy", function(done) {
  ghPages.publish(path.deploy);
  done();
});



gulp.task("default", gulp.series("build", "observer", function(done) {
  done();
}));