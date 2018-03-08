'use strict';

/**
 * FZLeg
 */
class FZLeg {
  /**
   * FZLeg constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.point = new Vector2D(opt.point);
    this.bezier = opt.bezier || null;
  }
}

module.exports = FZLeg;
