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
function FZBoard() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZBoard);

  /**
   * @type {String}
   */
  this.moduleId = opt.moduleId || null;

  /**
   * @type {String}
   */
  this.title = opt.title || null;

  /**
   * @type {String}
   */
  this.instance = opt.instance || null;

  /**
   * @type {String}
   */
  this.width = opt.width || null;

  /**
   * @type {String}
   */
  this.height = opt.height || null;
};

module.exports = FZBoard;