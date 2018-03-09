'use strict';

/**
 *
 */
class FZZCode {
  /**
   * the FZBoard constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * The codde filename
     * @type {String}
     */
    this.filename = opt.filename || '';

    /**
     * The code source
     * @type {String}
     */
    this.source = '';
  }
}

module.exports = FZZCode;
