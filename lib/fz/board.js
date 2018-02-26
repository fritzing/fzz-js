/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var FZBoard =
/**
 * the FZBoard constructor
 * @param {Object} opt
 */
function FZBoard(opt) {
  _classCallCheck(this, FZBoard);

  opt = opt || {};
  this.moduleId = opt.moduleId || '';
  this.title = opt.title || '';
  this.instance = opt.instance || '';
  this.width = opt.width || '';
  this.height = opt.height || '';
};

module.exports = FZBoard;