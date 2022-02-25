const { bundle } = require('sfcjs/bundler');
const path = require('path');

module.exports = function () {
  const file = this.resourcePath;
  const dir = path.basename(path.dirname(file));
  const code = bundle(file, {
    entryUrl: `/-/${dir}`,
    importLib: true,
    exportUrl: true,
  });
  return code;
};
