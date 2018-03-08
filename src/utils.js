'use strict';

const request = require('request');
const JSZip = require('jszip');
const FZZ = require('./fzz/fzz');
const FZZCode = require('./fzz/code');
const {parseFZ} = require('./fz/fz');

/**
 * Load a fzz file from an url
 * @param {string} url
 * @param {Function} cb
 */
function loadFZZ(url, cb) {
  request({method: 'GET', url: url, encoding: null}, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      cb(err, null);
    }
    readFZZ(url, body, cb);
  });
}

/**
 * read a fzz file data
 * @param {string} url
 * @param {string} data
 * @param {Function} cb
 */
function readFZZ(url, data, cb) {
  let tmpFZZ = new FZZ();
  tmpFZZ.uri = url;

  JSZip.loadAsync(data).then((zip) => {
    tmpFZZ.zip = zip;
    if (zip.files) {
      for (let filename in zip.files) {
        if (zip.files.hasOwnProperty(filename)) {
          // add each filename to the files array...
          tmpFZZ.files.push(filename);

          // check the file extension
          let ext = filename.split('.').pop();
          // console.log('FILENAME', filename, ext);

          switch (ext) {
            case 'fz':
            tmpFZZ.fz.filename = filename;
            break;

            case 'fzp':
            tmpFZZ.fz.fzps[filename] = filename;
            break;

            case 'svg':
            tmpFZZ.fz.svgs[filename] = filename;
            break;

            case 'ino':
            tmpFZZ.fz.code[filename] = new FZZCode();
            tmpFZZ.fz.code[filename].filename = filename;
            break;

            default:
            console.error('filetype not supported', ext, filename);
            break;
          }
        }
      }

      // unzip the files one by one
      zip.file(tmpFZZ.fz.filename).async('string').then(function success(text) {
        parseFZ(tmpFZZ.fz.filename, text, (err, data) => {
          if (err) {
            throw err;
          }
          tmpFZZ.fz = data;
          cb(null, tmpFZZ);
        });
      });
    }
}).catch((e) => {
  cb(e);
});
}


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

module.exports = {
  loadFZZ,
  readFZZ,
  FZZSourceTypes,
  getFilenameFromPath,
  readFzpFromUrl,
};
