'use strict';

/**
 * Vector 2D
 */
class Vector2D {
  /**
   * Vector2D constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.x = opt.x || 0;
    this.y = opt.y || 0;
  }
}

module.exports = Vector2D;
