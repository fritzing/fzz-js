/**
 * FZ Connector
 */
class Connector {
  /**
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.connectorId = opt.connectorId || '';
    this.layer = opt.layer || '';
    this.leg = {};
    this.geometry = opt.geometry || {};
    this.connects = opt.connects || {};
  }
}

/**
 * FZ Connect
 */
class Connect {
  /**
   *
   */
  constructor() {
    this.connectorId = '',
    this.modelIndex = '';
    this.layer = '';
  }
}

module.exports = {Connector, Connect};
