/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../src/fz'),
    FZ = _require.FZ;
// const FZZCode = require('../src/fzzcode');

/**
 * FZZ is the root object of each fzz file
 */


var FZZ =
/**
 * The FZZ constructor
 * @param {Object} opt constructor options
 * @param {Object} opt.uri name of the fzz (zip archive) file
 * @param {Object} opt.zip the list of files contained at the fzz archive
 * @param {Object} opt.files
 * @param {Object} opt.fz
 * @param {Object} opt.code
 * @param {Object} opt.parts
 */
function FZZ(opt) {
  _classCallCheck(this, FZZ);

  opt = opt || {};
  this.uri = opt.uri || undefined;
  this.zip = opt.zip || undefined;
  this.files = opt.files || [];
  this.fz = opt.fz || new FZ();
  // this.code = opt.code || new FZZCode();
  this.parts = opt.parts || []; // list of parts (fzp and svg files)
};

module.exports = FZZ;