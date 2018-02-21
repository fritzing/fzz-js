
/**
 *
 */
class FZView {
  /**
   * the FZView constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.name = opt.name || '';
    this.backgroundColor = '';
    this.gridSize = '';
    this.showGrid = true;
    this.alignToGrid = true;
    this.viewFromBelow = false;
    this.gpgKeepout = '';
    this.autorouteViaHoleSize = '';
    this.autorouteTraceWidth = '';
    this.autorouteViaRingThickness = '';
    this.drcKeepout = '';
  }
}

module.exports = FZView;
