
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
    this.moduleIdRef = ''
    this.modelIndex = ''
    this.path = ''
    this.property = []
    this.title = 'IMG1'
    this.views = {
      breadboard: [],
      pcbView: [],
      schematicView: []
    }
  }
}

module.exports = FZInstance;
