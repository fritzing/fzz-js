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
function Geometry(opt) {
  _classCallCheck(this, Geometry);

  opt = opt || {};
  this.x = opt.x || 0;
  this.y = opt.y || 0;
  this.z = opt.z || 0;
  this.x1 = opt.x1 || 0;
  this.y1 = opt.y1 || 0;
  this.x2 = opt.x2 || 0;
  this.y2 = opt.y2 || 0;
  this.wireFlags = opt.wireFlags || '';
};

module.exports = Geometry;
