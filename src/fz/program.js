'use strict';

/**
 * FZProgram
 */
class FZProgram {
  /**
   * the FZProgram constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.language = opt.language || null;
    this.source = opt.source || null;
  }
}

module.exports = FZProgram;
