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
function FZLeg(opt) {
  _classCallCheck(this, FZLeg);

  opt = opt || {};
  this.point = new Vector2D(opt.point);
  this.bezier = opt.bezier || null;
};

module.exports = FZLeg;