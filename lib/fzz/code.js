/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 *
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FZZCode =
/**
 * the FZBoard constructor
 * @param {Object} opt
 */
function FZZCode() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZZCode);

  /**
   * The codde filename
   * @type {String}
   */
  this.filename = opt.filename || '';

  /**
   * The code source
   * @type {String}
   */
  this.source = '';
};

module.exports = FZZCode;