'use strict';

/**
 * FZLeg for breadboard views.
 */
class FZLeg {
  /**
   * FZLeg constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * @type {Vector2D}
     */
    this.point = new Vector2D(opt.point);

    /**
     * @type {String}
     */
    this.bezier = opt.bezier || null;
  }
}

module.exports = FZLeg;
