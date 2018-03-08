'use strict';

/**
 *
 */
class FZBoard {
  /**
   * the FZBoard constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.moduleId = opt.moduleId || null;
    this.title = opt.title || null;
    this.instance = opt.instance || null;
    this.width = opt.width || null;
    this.height = opt.height || null;
  }
}

module.exports = FZBoard;
