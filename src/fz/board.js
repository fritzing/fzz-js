
/**
 *
 */
class FZBoard {
  /**
   * the FZBoard constructor
   * @param {Object} opt
   */
  constructor(opt) {
    opt = opt || {};
    this.moduleId = opt.moduleId || '';
    this.title = opt.title || '';
    this.instance = opt.instance || '';
    this.width = opt.width || '';
    this.height = opt.height || '';
  }
}

module.exports = FZBoard;
