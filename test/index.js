import names from './constructors.js';
import special from './special.js';

globalThis.self || (globalThis.self = {
  customElements: {
    define() {}
  }
});

import('../esm/main.js').then(({HTML, EXTENDS}) => {
  let looped = false;
  for (const name of names) {
    const shortCut = name.slice(4, -7) || 'Element';
    if (!(name in self))
      self[name] = class { hasAttribute() { return true; }};
    const Class = HTML[shortCut];
    console.assert(
      EXTENDS in Class || name === 'HTMLElement',
      'extends only non Element'
    );
    for (const [key, value] of Object.entries(special)) {
      if (name === `HTML${value}Element` && EXTENDS in HTML[key]) {
        looped = true;
        console.assert(
          key === HTML[key][EXTENDS],
          `${key} is extending ${HTML[key][EXTENDS]}`
        );
      }
    }
  }
  console.assert(looped, 'did not loop special cases');
});
