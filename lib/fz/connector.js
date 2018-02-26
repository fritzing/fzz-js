/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FZ Connector
 */
var Connector =
/**
 * @param {Object} opt
 */
function Connector(opt) {
  _classCallCheck(this, Connector);

  opt = opt || {};
  this.connectorId = opt.connectorId || '';
  this.layer = opt.layer || '';
  this.leg = {};
  this.geometry = opt.geometry || {};
  this.connects = opt.connects || {};
};

/**
 * FZ Connect
 */


var Connect =
/**
 *
 */
function Connect() {
  _classCallCheck(this, Connect);

  this.connectorId = '', this.modelIndex = '';
  this.layer = '';
};

module.exports = { Connector: Connector, Connect: Connect };