/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

var request = require('request');
var JSZip = require('jszip');
var FZZ = require('./fzz/fzz');
var FZZCode = require('./fzz/code');

var _require = require('./fz/fz'),
    parseFZ = _require.parseFZ;

/**
 * Load a fzz file from an url
 * @param {string} url
 * @param {Function} cb
 */


function loadFZZ(url, cb) {
  request({ method: 'GET', url: url, encoding: null }, function (err, res, body) {
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
  var tmpFZZ = new FZZ();
  tmpFZZ.uri = url;

  JSZip.loadAsync(data).then(function (zip) {
    tmpFZZ.zip = zip;
    if (zip.files) {
      for (var filename in zip.files) {
        if (zip.files.hasOwnProperty(filename)) {
          // add each filename to the files array...
          tmpFZZ.files.push(filename);

          // check the file extension
          var ext = filename.split('.').pop();
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
        parseFZ(tmpFZZ.fz.filename, text, function (err, data) {
          if (err) {
            throw err;
          }
          tmpFZZ.fz = data;
          cb(null, tmpFZZ);
        });
      });
    }
  }).catch(function (e) {
    cb(e);
  });
}

/**
 * supported file types and the extension
 */
var FZZSourceTypes = {
  fz: '.fz',
  ino: '.ino'
};

/**
 * e.g. getting the path from a fzz.object
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

module.exports = {
  loadFZZ: loadFZZ,
  readFZZ: readFZZ,
  FZZSourceTypes: FZZSourceTypes,
  getFilenameFromPath: getFilenameFromPath,
  readFzpFromUrl: readFzpFromUrl
};
