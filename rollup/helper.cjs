const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');

const fileName = join(__dirname, '..', 'index.js');

const content = readFileSync(fileName).toString();

const before = content.replace(/^([\s\S]+?)\/\*! \(c\) Andrea Giammarchi - ISC \*\/[\s\S]+$/, '$1');
const after = content.replace(/^[\s\S]+?\/\*! \(c\) Andrea Giammarchi - ISC \*\/([\s\S]+)$/, '$1');

writeFileSync(
  fileName,
  `/*! (c) Andrea Giammarchi - ISC */

try {
  class P extends HTMLParagraphElement {}
  self.customElements.define('p-' + Date.now(), P, {extends: 'p'});
  new P;
}
catch (o_O) {
${before.trim().replace(/^/gm, '  ')}
}

${after.trim()}
`
);
