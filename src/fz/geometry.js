'use strict';

/**
 * Geometry
 */
class Geometry {
  /**
   * Geometry constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
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
  }
}

module.exports = Geometry;
