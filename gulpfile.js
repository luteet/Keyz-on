const { src, dest, watch, parallel, series } = require('gulp');

const scss			= require('gulp-sass')(require('sass')),
	  fs			= require('fs'),
	  concat		= require('gulp-concat'),
	  webp			= require('gulp-webp'),
	  browserSync	= require('browser-sync').create(),
	  beautify		= require('gulp-beautify'),
	  uglify		= require('gulp-uglify-es').default,
	  autoprefixer	= require('gulp-autoprefixer'),
	  del			= require('del'),
	  include		= require('gulp-file-include'),
	  cssbeautify	= require('gulp-cssbeautify'),
	  minCSS		= require('gulp-cssmin'),
	  mediaGroup	= require('gulp-group-css-media-queries'),
	  ttf2woff		= require('gulp-ttf2woff'),
	  ttf2woff2		= require('gulp-ttf2woff2'),
	  zipArchive	= require('gulp-zip');


function cleanDist() {
	return del('dist')
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		notify: false,
	})
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function convertToWebp() {
	return src('app/img/*/**.*')
	.pipe(webp())
	.pipe(dest('dist/img'))
}

function images() {
	return src('app/img/*/**')
	.pipe(dest('dist/img'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function scriptsLib() {
	return src([
		'node_modules/swiper/swiper-bundle.min.js', // Slider
		'node_modules/overlayscrollbars/overlayscrollbars.esm.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function scriptsMin() {
	return src('app/js/main.js')
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src('app/js/main.js')
	.pipe(scriptsMin())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function htmlCompilation() {
	return src(['app/*.html'])
	.pipe(include())
	.pipe(beautify.html({ indent_size: 1, indent_char: "	" }))
	.pipe(dest('dist'))
	.pipe(browserSync.stream())
}

function htmlComponents() {
	return src('app/html/**/_*.html')
	.pipe(include())
	.pipe(htmlCompilation())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(mediaGroup())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			cascade: false
		}))
		.pipe(minCSS())
		.pipe(concat('style.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function stylesOriginal() {
	return src('dist/css/style.min.css')
		.pipe(concat('style.css'))
		.pipe(cssbeautify())
		.pipe(dest('dist/css'))
}

function stylesLib() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/swiper/swiper-bundle.min.css', // Slider
		'node_modules/overlayscrollbars/styles/overlayscrollbars.min.css'
	])
	.pipe(concat('_libs.scss'))
	.pipe(dest('app/scss'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function ttf2woffConvert() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(dest('dist/css'))
}

function ttf2woff2Convert() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('dist/css'))
}

function fonts() {
	return src('app/css/*.woff', 'app/css/*.woff2')
		.pipe(dest('dist/css'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function json() {
	return src('app/json/*.json')
		.pipe(dest('dist/json'))
}

function video() {
	return src('app/video/*')
		.pipe(dest('dist/video'))
}

function audio() {
	return src('app/audio/*')
		.pipe(dest('dist/audio'))
}

let package = fs.readFileSync('package.json'),
	name;

	package = JSON.parse(package);
	name = package.name;

function delFolder() {
	return del(`${name}`)
}

function createFolder() {
	return src(['./**', '!./node_modules/**', '!./package-lock.json', `!./${name}.zip`])
		.pipe(dest(`./${name}`))
}

function createZip() {
	return src(`./${name}/**`)
		.pipe(zipArchive(`${name}.zip`))
		.pipe(dest(`./`))
}

function zipDel() {
	return del(`${name}`);
}

function sprites() {
	return src(`app/img/sprites.svg`)
		.pipe(dest(`dist/img`))
}

function watching() {
	watch(['app/scss/**/*.scss'], series(styles, stylesOriginal));
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/json/*.json'], json);
	watch(['app/video/*'], video);
	watch(['app/audio/*'], audio);
	watch(['app/img/sprites.svg'], sprites);
	watch(['app/*.html'], htmlCompilation);
	watch(['app/html/**/_*.html'], htmlComponents);
}

exports.convertToWebp = convertToWebp;
exports.styles = styles;
exports.stylesOriginal = stylesOriginal;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsMin = scriptsMin;
exports.scriptsLib = scriptsLib;
exports.cleanDist = cleanDist;
exports.stylesLib = stylesLib;
exports.ttf2woffConvert = ttf2woffConvert;
exports.ttf2woff2Convert = ttf2woff2Convert;
exports.fonts = fonts;
exports.htmlComponents = htmlComponents;
exports.htmlCompilation = htmlCompilation;
exports.createFolder = createFolder;
exports.delFolder = delFolder;
exports.createZip = createZip;
exports.zipDel = zipDel;

exports.fonts = series(ttf2woffConvert, ttf2woff2Convert, fonts);
exports.folder = series(delFolder, createFolder);
exports.zip = series(createFolder, createZip, zipDel);
exports.webp = series(images, convertToWebp)
exports.default = parallel(stylesLib, styles, watching, scriptsLib, scriptsMin, scripts, htmlCompilation, json, sprites, browsersync);
