/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * Vector2D is a general geometry structure we use for all coordinates.
 * WE can replace the class with a full featured math vector module later.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2D =
/**
 * Vector2D constructor
 * @param {Object} opt
 */
function Vector2D(opt) {
  _classCallCheck(this, Vector2D);

  opt = opt || {};

  /**
   * The x position
   * @type {Number}
   */
  this.x = opt.x || 0;

  /**
   * The y position
   * @type {Number}
   */
  this.y = opt.y || 0;
};

module.exports = Vector2D;
