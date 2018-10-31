/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * FZLeg for breadboard views.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FZLeg =
/**
 * FZLeg constructor
 * @param {Object} opt
 */
function FZLeg() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZLeg);

  /**
   * @type {Vector2D}
   */
  this.point = new Vector2D(opt.point);

  /**
   * @type {String}
   */
  this.bezier = opt.bezier || null;
};

module.exports = FZLeg;