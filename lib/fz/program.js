/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * FZProgram
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FZProgram =
/**
 * the FZProgram constructor
 * @param {Object} opt
 */
function FZProgram() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZProgram);

  /**
   * @type {String}
   */
  this.language = opt.language || null;

  /**
   * @type {String}
   */
  this.source = opt.source || null;
};

module.exports = FZProgram;