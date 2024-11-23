const { src, dest } = require('gulp');
const beautify = require('gulp-jsbeautifier');
const newer = require('gulp-newer');
const config = require('../../config.json');

// Clone files in root
const cloneRoot = () =>
  src([config.dir.src + '*.*', '!src/*.html'])
  .pipe(dest(config.dir.dist))

const cloneJS = () =>
  src(config.jsSetting.src)
  .pipe(newer(config.jsSetting.dist))
  .pipe(beautify({
    config: '.jsbeautifyrc',
    mode: 'VERIFY_AND_WRITE'
  }))
  .pipe(dest(config.jsSetting.dist))

const cloneFontFolder = () =>
  src(config.fontsSetting.src)
  .pipe(newer(config.fontsSetting.dist))
  .pipe(dest(config.fontsSetting.dist))

const cloneVideoFolder = () =>
    src(config.videosSetting.src)
    .pipe(newer(config.videosSetting.dist))
    .pipe(dest(config.videosSetting.dist))
  
module.exports={
  cloneRoot,
  cloneJS,
  cloneFontFolder,
  cloneVideoFolder
}