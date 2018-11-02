/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * supported file types and the extension
 */
var FZZSourceTypes = {
  fz: '.fz',
  ino: '.ino'
};

/**
 * e.g. getting the path from a fzz.object:
 * fzz.fz.instance[0].path
 * @param {string} src
 * @return {string}
 */
function getFilenameFromPath(src) {
  var split = src.split('/');
  var splitLenght = split.length;
  return split[splitLenght - 1];
}

/**
 * url util
 * @param {string} src
 * @return {string}
 */
function readFzpFromUrl(src) {
  var fzpFile = getFilenameFromPath(src);
  var url = 'http://fritzing.github.io/fritzing-parts/core/' + fzpFile;
  return url;
}

module.exports = { FZZSourceTypes: FZZSourceTypes, getFilenameFromPath: getFilenameFromPath, readFzpFromUrl: readFzpFromUrl };