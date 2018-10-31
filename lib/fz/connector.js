/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

/**
 * FZConnector
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FZConnector =
/**
 * @param {Object} opt
 */
function FZConnector(opt) {
  _classCallCheck(this, FZConnector);

  opt = opt || {};
  this.connectorId = opt.connectorId || null;
  this.layer = opt.layer || null;
  this.leg = opt.leg || {};
  this.geometry = opt.geometry || {};
  this.connects = opt.connects || {};
};

/**
 * FZConnect
 */


var FZConnect =
/**
 *
 */
function FZConnect() {
  _classCallCheck(this, FZConnect);

  this.connectorId = null, this.modelIndex = null;
  this.layer = null;
};

module.exports = { FZConnector: FZConnector, FZConnect: FZConnect };
