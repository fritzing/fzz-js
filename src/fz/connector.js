'use strict';

/**
 * FZConnector
 */
class FZConnector {
  /**
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.connectorId = opt.connectorId || null;
    this.layer = opt.layer || null;
    this.leg = opt.leg || {};
    this.geometry = opt.geometry || {};
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
    this.connectorId = null,
    this.modelIndex = null;
    this.layer = null;
  }
}

module.exports = {FZConnector, FZConnect};
