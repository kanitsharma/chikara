/* eslint-disable */
Array.prototype.last = function() {
  return this.length ? this[this.length - 1] : null;
}

Array.prototype.shrink = function(length) {
  return this.reduce(
    (acc, curr) => (acc.last().length < length ?
      [...acc.slice(0, acc.length - 1), [...acc.last(), curr]] : acc.concat([[curr]]))
    , [[]]);
}
