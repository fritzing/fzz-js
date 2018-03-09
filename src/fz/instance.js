'use strict';

const Geometry = require('./geometry');

/**
 *
 */
class FZInstance {
  /**
   * the FZInstance constructor
   * @param {Object} opt
   */
  constructor(opt = {}) {
    /**
     * @type {String}
     */
    this.moduleIdRef = opt.moduleIdRef || '';

    /**
     * @type {String}
     */
    this.modelIndex = opt.modelIndex || '';

    /**
     * @type {String}
     */
    this.path = opt.path || '';

    /**
     * @type {Array}
     */
    this.property = opt.property || [];

    /**
     * @type {String}
     */
    this.title = opt.title || '';

    /**
     * @type {Object}
     */
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
  constructor(opt = {}) {
    /**
     * @type {String}
     */
    this.layer = opt.layer || '';

    /**
     * @type {String}
     */
    this.bottom = opt.bottom || '';

    /**
     * @type {String}
     */
    this.geometry = new Geometry(opt.geometry) || new Geometry();

    /**
     * @type {String}
     */
    this.wireExtra = opt.wireExtra || '';

    /**
     * @type {String}
     */
    this.connectors = opt.connectors || '';
  }
}

module.exports = {FZInstance, FZInstanceView};
