const {FZ} = require('../src/fz');

/**
 * FZZ is the root object of each fzz file
 */
class FZZ {
  /**
   * The FZZ constructor
   * @param {Object} opt constructor options
   * @param {Object} opt.uri name of the fzz (zip archive) file
   * @param {Object} opt.zip the list of files contained at the fzz archive
   * @param {Object} opt.files
   * @param {Object} opt.fz
   * @param {Object} opt.code
   * @param {Object} opt.parts list of parts (fzp and svg files)
   */
  constructor(opt) {
    opt = opt || {};
    this.uri = opt.uri || undefined;
    this.zip = opt.zip || undefined;
    this.files = opt.files || [];
    this.fz = opt.fz || new FZ();
    // this.code = opt.code || new FZZCode();
  }
}

module.exports = FZZ;
