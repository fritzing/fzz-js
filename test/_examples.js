'use strict';

const fs = require('fs');
const path = require('path');
const {readFZZ} = require('../src/utils');

let fzpDir = fs.readdirSync(path.join(__dirname, './fixtures/creatorkit-code/en/Fritzing'));

eachPromise(fzpDir, (name, next) => {
  if (path.extname(name) === '.fzz') {
    const data = fs.readFileSync(path.join(__dirname, './fixtures/creatorkit-code/en/Fritzing', name));
    readFZZ('test', data, (err, fzz) => {
      if (err) {
        console.error('==> ERROR', name);
        console.error(err);
        next();
      }
      console.log('==> OK   ', name);
      next();
    });
  }
}, () => {
  console.log('==> done');
});

function eachPromise(items, task, cb) {
  let idx = 0;
  let len = items.length;
  iter();
  function iter() {
    task(items[idx++], function() {
 idx >= len ? cb() : iter();
});
  }
};
