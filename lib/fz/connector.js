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
function FZConnector() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FZConnector);

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
};

module.exports = { FZConnector: FZConnector, FZConnect: FZConnect };