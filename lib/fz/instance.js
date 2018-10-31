/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geometry = require('./geometry');

/**
 *
 */

var FZInstance =
/**
 * the FZInstance constructor
 * @param {Object} opt
 */
function FZInstance() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZInstance);

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
    schematic: []
  };
};

/**
 * FZInstanceView
 */


var FZInstanceView =
/**
 * FZInstanceView constructor
 * @param {Object} opt
 */
function FZInstanceView() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZInstanceView);

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
};

module.exports = { FZInstance: FZInstance, FZInstanceView: FZInstanceView };