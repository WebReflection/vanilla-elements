/*! (c) Andrea Giammarchi - ISC */

try {
  if (!self.customElements.get('f-d')) {
    class D extends HTMLLIElement {}
    self.customElements.define('f-d', D, {extends: 'li'});
    new D;
  }
}
catch (o_O) {
  var attributesObserver = (whenDefined, MutationObserver) => {
  
    const attributeChanged = records => {
      for (let i = 0, {length} = records; i < length; i++)
        dispatch(records[i]);
    };
  
    const dispatch = ({target, attributeName, oldValue}) => {
      target.attributeChangedCallback(
        attributeName,
        oldValue,
        target.getAttribute(attributeName)
      );
    };
  
    return (target, is) => {
      const {observedAttributes: attributeFilter} = target.constructor;
      if (attributeFilter) {
        whenDefined(is).then(() => {
          new MutationObserver(attributeChanged).observe(target, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter
          });
          for (let i = 0, {length} = attributeFilter; i < length; i++) {
            if (target.hasAttribute(attributeFilter[i]))
              dispatch({target, attributeName: attributeFilter[i], oldValue: null});
          }
        });
      }
      return target;
    };
  };
  
  const {keys} = Object;
  
  const expando = element => {
    const key = keys(element);
    const value = [];
    const {length} = key;
    for (let i = 0; i < length; i++) {
      value[i] = element[key[i]];
      delete element[key[i]];
    }
    return () => {
      for (let i = 0; i < length; i++)
        element[key[i]] = value[i];
    };
  };
  
  const TRUE = true, FALSE = false;
  const QSA$1 = 'querySelectorAll';
  
  function add(node) {
    this.observe(node, {subtree: TRUE, childList: TRUE});
  }
  
  /**
   * Start observing a generic document or root element.
   * @param {Function} callback triggered per each dis/connected node
   * @param {Element?} root by default, the global document to observe
   * @param {Function?} MO by default, the global MutationObserver
   * @returns {MutationObserver}
   */
  const notify = (callback, root, MO) => {
    const loop = (nodes, added, removed, connected, pass) => {
      for (let i = 0, {length} = nodes; i < length; i++) {
        const node = nodes[i];
        if (pass || (QSA$1 in node)) {
          if (connected) {
            if (!added.has(node)) {
              added.add(node);
              removed.delete(node);
              callback(node, connected);
            }
          }
          else if (!removed.has(node)) {
            removed.add(node);
            added.delete(node);
            callback(node, connected);
          }
          if (!pass)
            loop(node[QSA$1]('*'), added, removed, connected, TRUE);
        }
      }
    };
  
    const observer = new (MO || MutationObserver)(records => {
      for (let
        added = new Set,
        removed = new Set,
        i = 0, {length} = records;
        i < length; i++
      ) {
        const {addedNodes, removedNodes} = records[i];
        loop(removedNodes, added, removed, FALSE, FALSE);
        loop(addedNodes, added, removed, TRUE, FALSE);
      }
    });
  
    observer.add = add;
    observer.add(root || document);
  
    return observer;
  };
  
  const QSA = 'querySelectorAll';
  
  const {document: document$2, Element: Element$1, MutationObserver: MutationObserver$2, Set: Set$2, WeakMap: WeakMap$1} = self;
  
  const elements = element => QSA in element;
  const {filter} = [];
  
  var qsaObserver = options => {
    const live = new WeakMap$1;
    const drop = elements => {
      for (let i = 0, {length} = elements; i < length; i++)
        live.delete(elements[i]);
    };
    const flush = () => {
      const records = observer.takeRecords();
      for (let i = 0, {length} = records; i < length; i++) {
        parse(filter.call(records[i].removedNodes, elements), false);
        parse(filter.call(records[i].addedNodes, elements), true);
      }
    };
    const matches = element => (
      element.matches ||
      element.webkitMatchesSelector ||
      element.msMatchesSelector
    );
    const notifier = (element, connected) => {
      let selectors;
      if (connected) {
        for (let q, m = matches(element), i = 0, {length} = query; i < length; i++) {
          if (m.call(element, q = query[i])) {
            if (!live.has(element))
              live.set(element, new Set$2);
            selectors = live.get(element);
            if (!selectors.has(q)) {
              selectors.add(q);
              options.handle(element, connected, q);
            }
          }
        }
      }
      else if (live.has(element)) {
        selectors = live.get(element);
        live.delete(element);
        selectors.forEach(q => {
          options.handle(element, connected, q);
        });
      }
    };
    const parse = (elements, connected = true) => {
      for (let i = 0, {length} = elements; i < length; i++)
        notifier(elements[i], connected);
    };
    const {query} = options;
    const root = options.root || document$2;
    const observer = notify(notifier, root, MutationObserver$2);
    const {attachShadow} = Element$1.prototype;
    if (attachShadow)
      Element$1.prototype.attachShadow = function (init) {
        const shadowRoot = attachShadow.call(this, init);
        observer.add(shadowRoot);
        return shadowRoot;
      };
    if (query.length)
      parse(root[QSA](query));
    return {drop, flush, observer, parse};
  };
  
  const {
    customElements: customElements$1, document: document$1,
    Element, MutationObserver: MutationObserver$1, Object: Object$1, Promise: Promise$1,
    Map: Map$1, Set: Set$1, WeakMap, Reflect
  } = self;
  
  const {attachShadow} = Element.prototype;
  const {createElement} = document$1;
  const {define: define$1, get, upgrade} = customElements$1;
  const {construct} = Reflect || {construct(HTMLElement) {
    return HTMLElement.call(this);
  }};
  
  const {defineProperty, getOwnPropertyNames, setPrototypeOf} = Object$1;
  
  const shadowRoots = new WeakMap;
  const shadows = new Set$1;
  
  const classes = new Map$1;
  const defined = new Map$1;
  const prototypes = new Map$1;
  const registry = new Map$1;
  
  const shadowed = [];
  const query = [];
  
  const getCE = is => registry.get(is) || get.call(customElements$1, is);
  
  const handle = (element, connected, selector) => {
    const proto = prototypes.get(selector);
    if (connected && !proto.isPrototypeOf(element)) {
      const redefine = expando(element);
      override = setPrototypeOf(element, proto);
      try { new proto.constructor; }
      finally {
        override = null;
        redefine();
      }
    }
    const method = `${connected ? '' : 'dis'}connectedCallback`;
    if (method in proto)
      element[method]();
  };
  
  const {parse} = qsaObserver({query, handle});
  
  const {parse: parseShadowed} = qsaObserver({
    query: shadowed,
    handle(element, connected) {
      if (shadowRoots.has(element)) {
        if (connected)
          shadows.add(element);
        else
          shadows.delete(element);
        if (query.length)
          parseShadow.call(query, element);
      }
    }
  });
  
  const whenDefined = name => {
    if (!defined.has(name)) {
      let _, $ = new Promise$1($ => { _ = $; });
      defined.set(name, {$, _});
    }
    return defined.get(name).$;
  };
  
  const augment = attributesObserver(whenDefined, MutationObserver$1);
  
  let override = null;
  
  getOwnPropertyNames(self)
    .filter(k => /^HTML.*Element$/.test(k))
    .forEach(k => {
      const HTMLElement = self[k];
      function HTMLBuiltIn() {
        const {constructor} = this;
        if (!classes.has(constructor))
          throw new TypeError('Illegal constructor');
        const {is, tag} = classes.get(constructor);
        if (is) {
          if (override)
            return augment(override, is);
          const element = createElement.call(document$1, tag);
          element.setAttribute('is', is);
          return augment(setPrototypeOf(element, constructor.prototype), is);
        }
        else
          return construct.call(this, HTMLElement, [], constructor);
      }
      setPrototypeOf(HTMLBuiltIn, HTMLElement);
      defineProperty(
        HTMLBuiltIn.prototype = HTMLElement.prototype,
        'constructor',
        {value: HTMLBuiltIn}
      );
      defineProperty(self, k, {value: HTMLBuiltIn});
    });
  
  defineProperty(document$1, 'createElement', {
    configurable: true,
    value(name, options) {
      const is = options && options.is;
      if (is) {
        const Class = registry.get(is);
        if (Class && classes.get(Class).tag === name)
          return new Class;
      }
      const element = createElement.call(document$1, name);
      if (is)
        element.setAttribute('is', is);
      return element;
    }
  });
  
  if (attachShadow)
    Element.prototype.attachShadow = function (init) {
      const root = attachShadow.call(this, init);
      shadowRoots.set(this, root);
      return root;
    };
  
  defineProperty(customElements$1, 'get', {
    configurable: true,
    value: getCE
  });
  
  defineProperty(customElements$1, 'whenDefined', {
    configurable: true,
    value: whenDefined
  });
  
  defineProperty(customElements$1, 'upgrade', {
    configurable: true,
    value(element) {
      const is = element.getAttribute('is');
      if (is) {
        const constructor = registry.get(is);
        if (constructor) {
          augment(setPrototypeOf(element, constructor.prototype), is);
          // apparently unnecessary because this is handled by qsa observer
          // if (element.isConnected && element.connectedCallback)
          //   element.connectedCallback();
          return;
        }
      }
      upgrade.call(customElements$1, element);
    }
  });
  
  defineProperty(customElements$1, 'define', {
    configurable: true,
    value(is, Class, options) {
      if (getCE(is))
        throw new Error(`'${is}' has already been defined as a custom element`);
      let selector;
      const tag = options && options.extends;
      classes.set(Class, tag ? {is, tag} : {is: '', tag: is});
      if (tag) {
        selector = `${tag}[is="${is}"]`;
        prototypes.set(selector, Class.prototype);
        registry.set(is, Class);
        query.push(selector);
      }
      else {
        define$1.apply(customElements$1, arguments);
        shadowed.push(selector = is);
      }
      whenDefined(is).then(() => {
        if (tag) {
          parse(document$1.querySelectorAll(selector));
          shadows.forEach(parseShadow, [selector]);
        }
        else
          parseShadowed(document$1.querySelectorAll(selector));
      });
      defined.get(is)._(Class);
    }
  });
  
  function parseShadow(element) {
    const root = shadowRoots.get(element);
    parse(root.querySelectorAll(this), element.isConnected);
  }
  
  const EMPTY = '';
  const HEADING = 'Heading';
  const TABLECELL = 'TableCell';
  const TABLE_SECTION = 'TableSection';
  
  const ELEMENT = 'Element';
  
  const qualify = name => ('HTML' + (namespace[name] || '') + ELEMENT);
  
  const namespace = {
    A: 'Anchor',
    Caption: 'TableCaption',
    DL: 'DList',
    Dir: 'Directory',
    Img: 'Image',
    OL: 'OList',
    P: 'Paragraph',
    TR: 'TableRow',
    UL: 'UList',
  
    Article: EMPTY,
    Aside: EMPTY,
    Footer: EMPTY,
    Header: EMPTY,
    Main: EMPTY,
    Nav: EMPTY,
    [ELEMENT]: EMPTY,
  
    H1: HEADING,
    H2: HEADING,
    H3: HEADING,
    H4: HEADING,
    H5: HEADING,
    H6: HEADING,
  
    TD: TABLECELL,
    TH: TABLECELL,
  
    TBody: TABLE_SECTION,
    TFoot: TABLE_SECTION,
    THead: TABLE_SECTION,
  };
}

const EXTENDS = Symbol('extends');

const {customElements} = self;
const {define: $define} = customElements;
const names = new Map;

/**
* Define a custom elements in the registry.
* @param {string} name the custom element name
* @param {function} Class the custom element class definition
* @returns {function} the defined `Class` after definition
*/
const $ = (name, Class) => {
  const args = [name, Class];
  if (EXTENDS in Class)
    args.push({extends: Class[EXTENDS].toLowerCase()});
  $define.apply(customElements, args);
  names.set(Class, name);
  return Class;
};

/**
* Define a custom elements in the registry.
* @param {string} name the custom element name
* @param {function?} Class the custom element class definition. Optional when
*  used as decorator, instead of regular function.
* @returns {function} the defined `Class` after definition or a decorator
*/
const define = (name, Class) => Class ?
  $(name, Class) :
  Class => $(name, Class);

/** @type {HTML} */
const HTML = new Proxy(new Map, {
  get(map, Tag) {
    if (!map.has(Tag)) {
      const Native = self[qualify(Tag)];
      map.set(Tag, Tag === ELEMENT ?
        class extends Native {} :
        class extends Native {
          static get [EXTENDS]() { return Tag; }
          constructor() {
            // @see https://github.com/whatwg/html/issues/5782
            if (!super().hasAttribute('is'))
              this.setAttribute('is', names.get(this.constructor));
          }
        }
      );
    }
    return map.get(Tag);
  }
});

export { EXTENDS, HTML, define };
