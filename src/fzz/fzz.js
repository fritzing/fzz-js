const {FZ} = require('../fz/fz');

/**
 * FZZ is the root object of each fzz file
 */
class FZZ {
  /**
   * The FZZ constructor
   * @param {Object} opt       constructor options
   * @param {Object} opt.uri   name of the fzz (zip archive) file
   * @param {Object} opt.files list of all files
   * @param {Object} opt.fz    the man fritzing project file
   * @param {Object} opt.code  list of code sources
   * @param {Object} opt.fzps  list of parts fzp files
   * @param {Object} opt.svg   list of parts svg files
   * @param {Object} opt.zip   the list of files contained at the fzz archive
   */
  constructor(opt) {
    opt = opt || {};
    this.uri = opt.uri || undefined;
    this.files = opt.files || [];
    this.fz = opt.fz || new FZ();

    // this.code = opt.code || new FZZCode();
    // this.svgs = {};
    // this.fzps = {};

    // TODO: remove later. only useful for development
    this.zip = opt.zip || undefined;
  }
}

module.exports = FZZ;
