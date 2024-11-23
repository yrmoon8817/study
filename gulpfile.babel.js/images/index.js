require('babel-polyfill');
const {src, dest} = require('gulp');
const cache = require('gulp-cached');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const sassInlineSvg = require('gulp-sass-inline-svg');
const config = require('../../config.json');

const generateImages = () =>
  src(config.imgSetting.src)
  .pipe(cache('generateImages'))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 80, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ], {
    verbose: true
  }))
  .pipe(dest(config.imgSetting.dist))

const generateSVG = () =>
src(config.imgSetting.svg) 
.pipe(svgmin()) // Recommend using svg min to optimize svg files first
.pipe(sassInlineSvg({
    destDir: "src/css/scss/svg"
  })
);

module.exports={
  generateImages,
  generateSVG
}