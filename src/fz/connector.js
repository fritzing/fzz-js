'use strict';

/**
 * FZConnector
 */
class FZConnector {
  /**
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * @type {String}
     */
    this.connectorId = opt.connectorId || null;

    /**
     * @type {String}
     */
    this.layer = opt.layer || null;

    /**
     * @type {Object}
     */
    this.leg = opt.leg || {};

    /**
     * @type {Object}
     */
    this.geometry = opt.geometry || {};

    /**
     * @type {Object}
     */
    this.connects = opt.connects || {};
  }
}

/**
 * FZConnect
 */
class FZConnect {
  /**
   *
   */
  constructor() {
    /**
     * @type {String}
     */
    this.connectorId = null,

    /**
     * @type {String}
     */
    this.modelIndex = null;

    /**
     * @type {String}
     */
    this.layer = null;
  }
}

module.exports = {FZConnector, FZConnect};
