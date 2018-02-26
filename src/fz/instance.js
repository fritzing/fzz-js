const Geometry = require('./geometry');

/**
 *
 */
class FZInstance {
  /**
   * the FZInstance constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.moduleIdRef = opt.moduleIdRef || '';
    this.modelIndex = opt.modelIndex || '';
    this.path = opt.path || '';
    this.property = opt.property || [];
    this.title = opt.title || '';
    this.views = {
      breadboard: [],
      pcb: [],
      schematic: [],
    };
  }
}

/**
 * FZInstanceView
 */
class FZInstanceView {
  /**
   * FZInstanceView constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.layer = opt.layer || '';
    this.bottom = opt.bottom || '';
    this.geometry = new Geometry(opt.geometry) || new Geometry();
    this.wireExtra = opt.wireExtra || '';
    this.connectors = opt.connectors || '';
  }
}

module.exports = {FZInstance, FZInstanceView};
