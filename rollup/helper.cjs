const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');
const lookFor = `const EMPTY = '';`;

const fileName = join(__dirname, '..', 'index.js');

const content = readFileSync(fileName).toString();

const chunks = content.split(lookFor);

const before = chunks.shift().replace(/\/\*! \(c\) Andrea Giammarchi - ISC \*\//g, '');
const after = ['', ...chunks].join(lookFor).replace(/\/\*! \(c\) Andrea Giammarchi - ISC \*\//g, '');

writeFileSync(
  fileName,
  `/*! (c) Andrea Giammarchi - ISC */

try {
  if (!self.customElements.get('f-d')) {
    class D extends HTMLLIElement {}
    self.customElements.define('f-d', D, {extends: 'li'});
    new D;
  }
}
catch (o_O) {
${before.trim().replace(/^/gm, '  ')}
}

${after.trim()}
`
);
