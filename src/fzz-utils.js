const request = require('request');
const JSZip = require('jszip');
const FZZ = require('./fzz');
const {parseFZ} = require('./fz');

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
    for (let filename in zip.files) {
      if (zip.files.hasOwnProperty(filename)) {
        // add each filename to the files array...
        tmpFZZ.files.push(filename);

        // check the file extension
        let ext = filename.split('.').pop();
        // console.log(counter, 'FILENAME', filename, ext);

        switch (ext) {
          case 'fz':
            tmpFZZ.fz.filename = filename;

            // the fz file must be the same name as the filepath/filename.fz
            // var base = src.replace(/^.*[\\\/]/, '');
            // var baseFz = base.slice(0, -1);
            // if (filename !== undefined || filename !== baseFz) {
            //   alert('FZZ NOT VALID')
            //   console.log('OKKK', filename, baseFz);
            // }

            zip.file(filename).async('string').then(function success(text) {
              parseFZ(filename, text, (err, data) => {
                if (err) {
                  throw err
                }
                tmpFZZ.fz = data;
                cb(null, tmpFZZ);
              });
            });

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
            // zip.file(filename).async('string').then(success(text) => {
            // //   counter++;
            // //   // console.log(counter);
            //   tmpFZZ.code.addSource(filename, text);
            // //   // if (counter === totalFiles) {
            // //   //   cb(tmpFZZ);
            // //   // }
            // });
            break;

          default:
            throw new Error('filetype not supported');
        }
      }
    }
}).catch((e) => {
  cb(e);
});
}

module.exports = {loadFZZ, readFZZ};
