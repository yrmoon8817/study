const { src, dest } = require('gulp');
const concatcss = require('gulp-concat-css');
const sass = require('gulp-sass')(require('sass'));
const size = require('gulp-size');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const config = require('../../config.json');

const concatLibsCSS = () =>
  src(config.cssSetting.libs)
  .pipe(concatcss('libs.css'))
  .pipe(sass(config.cssSetting.sassOptsCp))
  .pipe(dest(config.cssSetting.dist))

const isDev = () => {
  let i = process.argv.indexOf("deploy");
  return i === -1;
}

const compileSCSS = () => 
src([config.cssSetting.src], { sourcemaps: isDev })
  .pipe(sass(config.cssSetting.sassOptsEx))
  .pipe(autoprefixer({
    overrideBrowserslist: config.autoprefixer,
    remove: false,
    cascade: false
  }))
  .pipe(size({
    showFiles: true
  }))
  .pipe(dest(config.cssSetting.dist, { sourcemaps: isDev }))
  .pipe(sass(config.cssSetting.sassOptsCp))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(config.cssSetting.dist, { sourcemaps: isDev }))

module.exports={
  concatLibsCSS,
  compileSCSS
}