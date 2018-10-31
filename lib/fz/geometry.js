/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * Geometry
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geometry =
/**
 * Geometry constructor
 * @param {Object} opt
 */
function Geometry() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Geometry);

  /**
   * @type {Number}
   */
  this.x = opt.x || 0;

  /**
   * @type {Number}
   */
  this.y = opt.y || 0;

  /**
   * @type {Number}
   */
  this.z = opt.z || 0;

  /**
   * @type {Number}
   */
  this.x1 = opt.x1 || 0;

  /**
   * @type {Number}
   */
  this.y1 = opt.y1 || 0;

  /**
   * @type {Number}
   */
  this.x2 = opt.x2 || 0;

  /**
   * @type {Number}
   */
  this.y2 = opt.y2 || 0;

  /**
   * @type {Number}
   */
  this.wireFlags = opt.wireFlags || '';
};

module.exports = Geometry;