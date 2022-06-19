const { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	del = require("del"),
	scss = require("gulp-sass")(require("sass")),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	babel = require('gulp-babel'),
	include = require('gulp-include'),
	webp = require('imagemin-webp');



function clean() {
	return del("./build/");
}



function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./build/"
		},
		port: 3000,
		notify: false
	})
	done();
}

function html() {
	return src(["./src/*.html", "!./src/_*.html"])
		.pipe(include())
		.pipe(dest("./build/"))
		.on("end", browsersync.reload);

}
function php() {
	return src("./src/*.php")
		.pipe(dest("./build/"))
		.on("end", browsersync.reload);
}
function phpMailer() {
	return src("./src/phpmailer/**/*.php")
		.pipe(dest("build/phpmailer/"))
		.on("end", browsersync.reload);
}


function css() {
	return src(["./src/assets/scss/**/*.scss", "!./src/scss/**/_*.scss"])
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				grid: true,
				cascade: true
			})
		)
		.pipe(dest("./build/assets/css/"))
		.pipe(clean_css({
			level: 2 //максимальное сжатие и объединение селекторов с одинаковыми стилями. По умолчанию level: 1
		}))
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest("./build/assets/css/"))
		.on("end", browsersync.reload);
}

function js() {
	return src("./src/assets/js/**/*.js")
		.pipe(include())
		.pipe(dest("./build/assets/js/"))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest("./build/assets/js/"))
		.on("end", browsersync.reload);
}

function images() {
	src("./src/assets/img/**/*.{jpg,png,svg,gif,ico}")
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 85, progressive: true }),
			imagemin.optipng({ optimizationLevel: 3 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: true }
				]
			})
		]))
		.pipe(dest("./build/assets/img/"))
	return src("./src/assets/img/**/*.{jpg,png,jpeg}")
		.pipe(imagemin([
			webp({
				quality: 85
			})
		]))
		.pipe(rename(function (path) {
			return {
				dirname: path.dirname,
				basename: path.basename,
				extname: path.extname + ".webp"
			};
		}))
		.pipe(dest("./build/assets/img/"))
		.on("end", browsersync.reload);
}

function fonts() {
	src("./src/assets/fonts/**/*.ttf")
		.pipe(ttf2woff())
		.pipe(dest("./build/assets/fonts/"));
	return src("./src/assets/fonts/**/*.ttf")
		.pipe(ttf2woff2())
		.pipe(dest("./build/assets/fonts/"));
};


function watchFiles(done) {

	gulp.watch(["./src/**/*.html"], html);
	gulp.watch(["./src/assets/scss/**/*.scss"], css);
	gulp.watch(["./src/assets/js/**/*.js"], js);
	gulp.watch(["./src/assets/img/**/*.{jpg,png,svg,gif,ico}"], images);
	gulp.watch(["./src/*.php"], php);
	done();
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, php, phpMailer));

const watch = gulp.parallel(build, watchFiles, browserSync);



exports.fonts = fonts;
// exports.PHPMailer = PHPMailer;
// exports.php = php;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;