'use strict';

/**
 * FZProgram
 */
class FZProgram {
  /**
   * the FZProgram constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * @type {String}
     */
    this.language = opt.language || null;

    /**
     * @type {String}
     */
    this.source = opt.source || null;
  }
}

module.exports = FZProgram;
