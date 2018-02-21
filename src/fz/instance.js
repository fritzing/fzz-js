
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
      pcbView: [],
      schematicView: [],
    };
  }
}

module.exports = FZInstance;
