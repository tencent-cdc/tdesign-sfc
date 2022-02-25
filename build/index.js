const fs = require('fs');
const path = require('path');
const config = require('./webpack.config');

const root = path.resolve(__dirname, '../packages');
const pkgs = fs.readdirSync(root).filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
  .filter(item => item.indexOf('t-') === 0);

const output = {
  libraryTarget: 'umd',
  globalObject: 'typeof window !== \'undefined\' ? window : typeof global !== \'undefined\' ? global : typeof self !== \'undefined\' ? self : this',
};

const main = {
  ...config,
  entry: path.resolve(root, 'index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    library: 'tdesign-sfc',
    ...output,
  },
};

fs.writeFileSync(path.resolve(__dirname, '../examples/index.html'), `<!DOCTYPE html>
<meta charset="utf-8" />

<style>
th, td {
  padding: 8px 20px;
  border-bottom: #f1f1f1 solid 1px;
}
th {
  border-bottom-width: 2px;
}
</style>

<table>
  <tr>
    <th>组件</th>
    <th>同步</th>
    <th>异步</th>
  </tr>
  ${
  pkgs.map(pkg => `
      <tr>
        <td>${pkg}</td>
        <td><a href="${pkg}/index.html">演示</a></td>
        <td><a href="${pkg}/async.html">演示</a></td>
      </tr>
    `).join('')
}
</table>

<pre><code>&lt;script src=&quot;https://unpkg.com/tdesign-sfc/dist/dist.js&quot;&gt;&lt;/script&gt;
&lt;t-button&gt;按钮&lt;/t-button&gt;</code></pre>
`);

module.exports = [
  main,
  {
    ...main,
    entry: path.resolve(root, 'async.js'),
    output: {
      ...main.output,
      filename: 'async.js',
    },
  },
  {
    ...main,
    output: {
      ...main.output,
      filename: 'dist.js',
    },
    externals: {},
  },
  ...pkgs.map(pkg => ({
    ...config,
    entry: path.resolve(root, pkg, 'index.js'),
    output: {
      path: path.resolve(__dirname, '../dist', pkg),
      filename: 'index.js',
      library: `tdesign-sfc/${pkg}`,
      ...output,
    },
  })),
];
