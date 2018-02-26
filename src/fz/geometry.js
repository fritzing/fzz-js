/**
 * Geometry
 */
class Geometry {
  /**
   * Geometry constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.z = opt.z || 0;
    this.x1 = opt.x1 || 0;
    this.y1 = opt.y1 || 0;
    this.x2 = opt.x2 || 0;
    this.y2 = opt.y1 || 0;
    this.wireFlags = opt.wireFlags || '';
  }
}

module.exports = Geometry;
