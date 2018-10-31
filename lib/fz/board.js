/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 *
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FZBoard =
/**
 * the FZBoard constructor
 * @param {Object} opt
 */
function FZBoard(opt) {
  _classCallCheck(this, FZBoard);

  opt = opt || {};
  this.moduleId = opt.moduleId || null;
  this.title = opt.title || null;
  this.instance = opt.instance || null;
  this.width = opt.width || null;
  this.height = opt.height || null;
};

module.exports = FZBoard;
