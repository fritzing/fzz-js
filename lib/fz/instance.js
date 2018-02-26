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
function FZInstance(opt) {
  _classCallCheck(this, FZInstance);

  opt = opt || {};
  this.moduleIdRef = opt.moduleIdRef || '';
  this.modelIndex = opt.modelIndex || '';
  this.path = opt.path || '';
  this.property = opt.property || [];
  this.title = opt.title || '';
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
function FZInstanceView(opt) {
  _classCallCheck(this, FZInstanceView);

  opt = opt || {};
  this.layer = opt.layer || '';
  this.bottom = opt.bottom || '';
  this.geometry = new Geometry(opt.geometry) || new Geometry();
  this.wireExtra = opt.wireExtra || '';
  this.connectors = opt.connectors || '';
};

module.exports = { FZInstance: FZInstance, FZInstanceView: FZInstanceView };