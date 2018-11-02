/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

var request = require('request');
var JSZip = require('jszip');
var FZZ = require('./fzz');

var _require = require('./fz'),
    parseFZ = _require.parseFZ;

/**
 * Load a fzz file from an url
 * @param {string} url
 * @param {Function} cb
 */


function loadFZZ(url, cb) {
  request({ method: 'GET', url: url, encoding: null }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      throw err;
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
  // cb(tmpFZZ)

  JSZip.loadAsync(data).then(function (zip) {
    tmpFZZ.zip = zip;
    // console.log('ZIP', zip);
    // console.log('FZZ Files:', zip.files);

    var totalFiles = Object.keys(zip.files).length;
    // console.log('TOTAL FILES', totalFiles);
    // let counter = 0;
    for (var filename in zip.files) {
      if (zip.files.hasOwnProperty(filename)) {
        // add each filename to the files array...
        tmpFZZ.files.push(filename);

        // check the file extension
        var ext = filename.split('.').pop();
        // console.log(counter, 'FILENAME', filename, ext);

        switch (ext) {
          case 'fz':
            // console.log('fz data');
            tmpFZZ.fz.filename = filename;
            // console.log(zip.files[filename]._data);
            //
            //         // the fz file must be the same name as the filepath/filename.fz
            //         // var base = src.replace(/^.*[\\\/]/, '');
            //         // var baseFz = base.slice(0, -1);
            //         // if (filename !== undefined || filename !== baseFz) {
            //         //   alert('FZZ NOT VALID')
            //         //   console.log('OKKK', filename, baseFz);
            //         // }
            //
            zip.file(filename).async('string').then(function success(text) {
              parseFZ(filename, text, function (data) {
                //     // tmpFZZ.fz = data
                //     // TODO: refactor / DRY it
                //     // if (counter === totalFiles) {
                //     // console.log('callback...');
                //     // counter++;
                //     // console.log(counter);
                //     // cb(data);
                // console.log('TEXT', data);
                tmpFZZ.fz = data;
                cb(tmpFZZ);
              });
              //         //   // }
            });
          //
          //         break;
          //
          case 'fzp':
            // TODO: load fzp
            // console.log('FZP', filename);
            break;

          case 'svg':
            // TODO: loadsvg
            // console.log('SVG', filename);
            break;

          case 'ino':
            console.log('CODE', filename);
            //         // zip.file(filename).async('string').then(function success(text) {
            //         // //   counter++;
            //         // //   // console.log(counter);
            //         //   tmpFZZ.code.addSource(filename, text);
            //         // //   // if (counter === totalFiles) {
            //         // //   //   cb(tmpFZZ);
            //         // //   // }
            //         // });
            break;

          default:
            throw new Error('filetype not supported');
        }
      }
    } // end for

    // cb(tmpFZZ);
  }).catch(function (e) {
    throw e;
  });
}

module.exports = { loadFZZ: loadFZZ, readFZZ: readFZZ };