'use strict';

/**
 *
 */
class FZBoard {
  /**
   * the FZBoard constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * @type {String}
     */
    this.moduleId = opt.moduleId || null;

    /**
     * @type {String}
     */
    this.title = opt.title || null;

    /**
     * @type {String}
     */
    this.instance = opt.instance || null;

    /**
     * @type {String}
     */
    this.width = opt.width || null;

    /**
     * @type {String}
     */
    this.height = opt.height || null;
  }
}

module.exports = FZBoard;
