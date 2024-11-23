'use strict';
const {series, parallel } = require('gulp');
const { cloneRoot, cloneFontFolder, cloneJS, cloneVideoFolder } = require('./clone');
const { swipeDist } = require('./swipe');
const { minifyJS } = require('./js');
const { generateImages, generateSVG } = require('./images');
const { concatLibsCSS, compileSCSS } = require('./css');
const { setHTML, generateHTML } = require('./html');
const { watchingResources, launchServer } = require('./server');
const { sourceDeploy } = require('./deploy');

const build = series(
  swipeDist,
  parallel(cloneRoot, cloneFontFolder,cloneVideoFolder, cloneJS, generateImages, generateSVG, concatLibsCSS, setHTML),
  generateHTML,
  minifyJS,
  compileSCSS
);

const defaultTask = series(build, watchingResources, launchServer);
const deploy = series(build, sourceDeploy);

module.exports = {
  cloneRoot,
  build,
  default: defaultTask,
  deploy
};