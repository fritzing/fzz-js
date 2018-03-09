'use strict';

/**
 * Vector2D is a general geometry structure we use for all coordinates.
 * WE can replace the class with a full featured math vector module later.
 */
class Vector2D {
  /**
   * Vector2D constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
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
  }
}

module.exports = Vector2D;
