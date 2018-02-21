/**
 * supported file types and the extension
 */
const FZZSourceTypes = {
  fz: '.fz',
  ino: '.ino',
};

/**
 * e.g. getting the path from a fzz.object
 * @param {string} src
 * @return {string}
 */
function getFilenameFromPath(src) {
  let split = src.split('/');
  let splitLenght = split.length;
  return split[splitLenght-1];
}

/**
 * url util
 * @param {string} src
 * @return {string}
 */
function readFzpFromUrl(src) {
  let fzpFile = getFilenameFromPath(src);
  let url = 'http://fritzing.github.io/fritzing-parts/core/' + fzpFile;
  return url;
}

module.exports = {FZZSourceTypes, getFilenameFromPath, readFzpFromUrl};
