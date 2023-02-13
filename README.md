# Vanilla Elements

<sup>**Social Media Photo by [Jocelyn Morales](https://unsplash.com/@molnj) on [Unsplash](https://unsplash.com/)**</sup>

📣 This project didn't gain nearly nough attention as hoped so I've decided to extend builtins with [nonchalance](https://github.com/WebReflection/nonchalance#readme) and I suggest you check that out instead, as it doesn't rely at all to a *maybe* polyfill needed to work, it doesn't need to patch globals, and most importantly, it's half of the size of this module through its */runtime* variant.

- - -

A Minimalistic Custom Elements Helper, with optional polyfill included, compatible with every evergreen browser.

The default module export, which is ~0.5K, works natively in Chrome, Edge, and Firefox, but if you target Safari / WebKit too, you can use the `vanilla-elements/poly` variant, which is ~2K, and it includes proper features detection, leaving Chrome, Edge, and Firefox 100% native.

```js
import {define, HTML} from 'vanilla-elements';

// generic components ... or
define('my-comp', class extends HTML.Element {
  // native Custom Elements definition
});

// ... builtins extend simplified ... and
define('my-div', class extends HTML.Div {
  // native Custom Elements definition
});

// ... as decorator 🥳
@define('my-footer')
class MyFooter extends HTML.Footer {}

document.body.appendChild(new MyFooter);
```


## API

  * the `define(name:string, Class):Class` automatically recognize the right way to define each component, either generic elements or built-ins.
  * the `HTML` namespace contains all available HTML classes from the browser, with shortcuts such as `Div`, `Main`, `Footer`, `A`, `P`, and everything else.

**[Live Example](https://codepen.io/WebReflection/pen/jOmVVQQ?editors=0010)**

```js
import {define, HTML} from 'vanilla-elements';
import {render, html} from 'uhtml';

define('h2-greetings', class extends HTML.H2 {
  constructor() {
    super();
    this.html = (...args) => render(this, html(...args));
    this.render();
  }
  render() {
    this.html`Hello Vanilla Elements 👋`;
  }
});

render(document.body, html`
  <h2 is="h2-greetings" />
`);
```


## F.A.Q.

<details>
  <summary><strong>What is the benefit of using this module?</strong></summary>
  <div>

Beside solving this [long outstanding bug](https://github.com/whatwg/html/issues/5782) out of the box, the feature detection for builtin extends is both ugly and not really Web friendly.

One could simply include [@ungap/custom-elements](https://github.com/ungap/custom-elements#readme) polyfill on top of each page and call it a day, but I wanted to have only the missing part, builtin extends, embedded in a module, and this helper is perfect for that purpose.

On top of that, I really don't like the ugly dance needed to register builtin extends, so that having a tiny utility that simplifies their definition seemed to be about right.

```js
// without this module
customElements.define(
  'my-div',
  class extends HTMLDivElement {},
  {extends: 'div'}
);

// with this module
import {define, HTML} from 'vanilla-elements';
define('my-div', class extends HTML.Div {});
```

As we can see, the definition through this module is more compact, elegant, and natural, than its native counter-part, and that's about it.

  </div>
</details>

<details>
  <summary><strong>Why isn't the polyfill included by default?</strong></summary>
  <div>

The only browser that needs a polyfill for builtin extends is Safari / WebKit, and it needs it only for builtin extends, but not everyone develops for the Web, and not everyone uses builtin extends, so the sane default is to provide a minimal utility that simplifies custom elements registration that works out of the box in every modern browser.

Whenever the target needs to include Safari / WebKit, and builtin extends are used, it takes nothing to switch import from `vanilla-elements` to `vanilla-elements/poly` or use [an import-map](https://gist.github.com/WebReflection/5fc85856bba3d6eef794877fb5fa2a52) workaround to load the poly only in Safari.


```html
<!doctype html>
<script>
(({document, chrome, netscape}) => {
  const src = 'https://cdn.skypack.dev/vanilla-elements/';
  const {head} = document;
  const script = head.insertBefore(document.createElement('script'), head.firstChild);
  script.type = 'importmap';
  script.textContent = JSON.stringify({
    imports: {
      'vanilla-elements': (chrome || netscape) ? src : (src + 'es.js')
    }
  });
})(self);
</script>
```

  </div>
</details>

<details>
  <summary><strong>What are the exports?</strong></summary>
  <div>

For development usage, through bundlers and similar tools:

  * `vanilla-elements` points at the [main.js](./esm/main.js), and it doesn't include the polyfill
  * `vanilla-elements/poly` points at the generated [index.js](./index.js) file, and include the polyfill after feature detection

For CDN usage in the wild:

  * the `//unpkg.com/vanilla-elements` CDN points at the minified [es.js](./es.js) which *includes* the polyfill (it's the minified index)
  * for `skypack.dev` minified file, you can point at the `es.js` file directly: [//cdn.skypack.dev/vanilla-elements/es.js](https://cdn.skypack.dev/vanilla-elements/es.js)

  </div>
</details>
