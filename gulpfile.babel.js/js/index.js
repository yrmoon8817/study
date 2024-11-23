const {src, dest} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const config = require('../../config.json');

const minifyJS = () =>
  src(config.jsSetting.src)
  .pipe(concat(config.jsSetting.minifyFileName))
  .pipe(uglify())
  .pipe(dest(config.jsSetting.dist))

module.exports={
    minifyJS
}
