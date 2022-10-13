var path = require('path');

/**
 * Actual function that tries to resolve a given directory in search
 * of a given what ever triggers the iterator to return a value.
 *
 * @param {String} root Directory that we need to search in.
 * @param {Function} iterator Function that is called on each directory level.
 * @returns {Mixed} Null incase of nothing, anthing else incase of result.
 * @private
 */
module.exports = function resolve(root, iterator) {
  /**
   * The actual function that does the iteration of the directory and
   * searches for the correct file. It traverses the parent directory
   * until it reaches the root directory.
   *
   * @private
   */
  return (function next() {
    if (root.match(/^(\w:\\|\/)$/) || root == path.sep) return null;

    var data = iterator(root);
    if (data) return data;

    root = path.resolve(root, '..');

    //
    // No suitable match found, continue with the iteration until we've found
    // something fruitful.
    //
    return next();
  }());
}
