/*! (c) Andrea Giammarchi - ISC */

try {
  class P extends HTMLParagraphElement {}
  self.customElements.define('p-' + Date.now(), P, {extends: 'p'});
  new P;
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
  
  const {document: document$2, Element: Element$1, MutationObserver: MutationObserver$2, Set: Set$2, WeakMap: WeakMap$2} = self;
  
  const elements = element => QSA in element;
  const {filter} = [];
  
  var qsaObserver = options => {
    const live = new WeakMap$2;
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
    Map, Set: Set$1, WeakMap: WeakMap$1, Reflect
  } = self;
  
  const {attachShadow} = Element.prototype;
  const {createElement} = document$1;
  const {define: define$1, get} = customElements$1;
  const {construct} = Reflect || {construct(HTMLElement) {
    return HTMLElement.call(this);
  }};
  
  const {defineProperty, getOwnPropertyNames, setPrototypeOf} = Object$1;
  
  const shadowRoots = new WeakMap$1;
  const shadows = new Set$1;
  
  const classes = new Map;
  const defined = new Map;
  const prototypes = new Map;
  const registry = new Map;
  
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
    .filter(k => /^HTML/.test(k))
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
}

/**
 * @typedef {Object} HTML - the namespace for all HTML classes to extends.
 * @property {HTMLElement} Element - a generic custom element
 * @property {HTMLElement} Article - a builtin custom element
 * @property {HTMLElement} Aside - a builtin custom element
 * @property {HTMLElement} Footer - a builtin custom element
 * @property {HTMLElement} Header - a builtin custom element
 * @property {HTMLElement} Main - a builtin custom element
 * @property {HTMLElement} Nav - a builtin custom element
 * @property {HTMLElement} Section - a builtin custom element
 * @property {HTMLAnchorElement} A - a builtin custom element
 * @property {HTMLDListElement} DL - a builtin custom element
 * @property {HTMLDirectoryElement} Dir - a builtin custom element
 * @property {HTMLHeadingElement} H6 - a builtin custom element
 * @property {HTMLHeadingElement} H5 - a builtin custom element
 * @property {HTMLHeadingElement} H4 - a builtin custom element
 * @property {HTMLHeadingElement} H3 - a builtin custom element
 * @property {HTMLHeadingElement} H2 - a builtin custom element
 * @property {HTMLHeadingElement} H1 - a builtin custom element
 * @property {HTMLImageElement} Img - a builtin custom element
 * @property {HTMLOListElement} OL - a builtin custom element
 * @property {HTMLParagraphElement} P - a builtin custom element
 * @property {HTMLTableCaptionElement} Caption - a builtin custom element
 * @property {HTMLTableCellElement} TH - a builtin custom element
 * @property {HTMLTableCellElement} TD - a builtin custom element
 * @property {HTMLTableRowElement} TR - a builtin custom element
 * @property {HTMLUListElement} UL - a builtin custom element
 * @property {HTMLVideoElement} Video - a generic custom element
 * @property {HTMLUnknownElement} Unknown - a generic custom element
 * @property {HTMLUListElement} UList - a generic custom element
 * @property {HTMLTrackElement} Track - a generic custom element
 * @property {HTMLTitleElement} Title - a generic custom element
 * @property {HTMLTimeElement} Time - a generic custom element
 * @property {HTMLTextAreaElement} TextArea - a generic custom element
 * @property {HTMLTemplateElement} Template - a generic custom element
 * @property {HTMLTableSectionElement} TableSection - a generic custom element
 * @property {HTMLTableRowElement} TableRow - a generic custom element
 * @property {HTMLTableElement} Table - a generic custom element
 * @property {HTMLTableColElement} TableCol - a generic custom element
 * @property {HTMLTableCellElement} TableCell - a generic custom element
 * @property {HTMLTableCaptionElement} TableCaption - a generic custom element
 * @property {HTMLStyleElement} Style - a generic custom element
 * @property {HTMLSpanElement} Span - a generic custom element
 * @property {HTMLSourceElement} Source - a generic custom element
 * @property {HTMLSlotElement} Slot - a generic custom element
 * @property {HTMLSelectElement} Select - a generic custom element
 * @property {HTMLScriptElement} Script - a generic custom element
 * @property {HTMLQuoteElement} Quote - a generic custom element
 * @property {HTMLProgressElement} Progress - a generic custom element
 * @property {HTMLPreElement} Pre - a generic custom element
 * @property {HTMLPictureElement} Picture - a generic custom element
 * @property {HTMLParamElement} Param - a generic custom element
 * @property {HTMLParagraphElement} Paragraph - a generic custom element
 * @property {HTMLOutputElement} Output - a generic custom element
 * @property {HTMLOptionElement} Option - a generic custom element
 * @property {HTMLOptGroupElement} OptGroup - a generic custom element
 * @property {HTMLObjectElement} Object - a generic custom element
 * @property {HTMLOListElement} OList - a generic custom element
 * @property {HTMLModElement} Mod - a generic custom element
 * @property {HTMLMeterElement} Meter - a generic custom element
 * @property {HTMLMetaElement} Meta - a generic custom element
 * @property {HTMLMenuElement} Menu - a generic custom element
 * @property {HTMLMediaElement} Media - a generic custom element
 * @property {HTMLMarqueeElement} Marquee - a generic custom element
 * @property {HTMLMapElement} Map - a generic custom element
 * @property {HTMLLinkElement} Link - a generic custom element
 * @property {HTMLLegendElement} Legend - a generic custom element
 * @property {HTMLLabelElement} Label - a generic custom element
 * @property {HTMLLIElement} LI - a generic custom element
 * @property {HTMLInputElement} Input - a generic custom element
 * @property {HTMLImageElement} Image - a generic custom element
 * @property {HTMLIFrameElement} IFrame - a generic custom element
 * @property {HTMLHtmlElement} Html - a generic custom element
 * @property {HTMLHeadingElement} Heading - a generic custom element
 * @property {HTMLHeadElement} Head - a generic custom element
 * @property {HTMLHRElement} HR - a generic custom element
 * @property {HTMLFrameSetElement} FrameSet - a generic custom element
 * @property {HTMLFrameElement} Frame - a generic custom element
 * @property {HTMLFormElement} Form - a generic custom element
 * @property {HTMLFontElement} Font - a generic custom element
 * @property {HTMLFieldSetElement} FieldSet - a generic custom element
 * @property {HTMLEmbedElement} Embed - a generic custom element
 * @property {HTMLDivElement} Div - a generic custom element
 * @property {HTMLDirectoryElement} Directory - a generic custom element
 * @property {HTMLDialogElement} Dialog - a generic custom element
 * @property {HTMLDetailsElement} Details - a generic custom element
 * @property {HTMLDataListElement} DataList - a generic custom element
 * @property {HTMLDataElement} Data - a generic custom element
 * @property {HTMLDListElement} DList - a generic custom element
 * @property {HTMLCollection} Col - a generic custom element
 * @property {HTMLCanvasElement} Canvas - a generic custom element
 * @property {HTMLButtonElement} Button - a generic custom element
 * @property {HTMLBodyElement} Body - a generic custom element
 * @property {HTMLBaseElement} Base - a generic custom element
 * @property {HTMLBRElement} BR - a generic custom element
 * @property {HTMLAudioElement} Audio - a generic custom element
 * @property {HTMLAreaElement} Area - a generic custom element
 * @property {HTMLAnchorElement} Anchor - a generic custom element
 * @property {HTMLSelectMenuElement} SelectMenu - a generic custom element
 * @property {HTMLPopupElement} Popup - a generic custom element
 */

const ELEMENT = 'Element';

const HTMLSpecial = {
  Anchor: 'A',
  DList: 'DL',
  Directory: 'Dir',
  Heading: ['H6', 'H5', 'H4', 'H3', 'H2', 'H1'],
  Image: 'Img',
  OList: 'OL',
  Paragraph: 'P',
  TableCaption: 'Caption',
  TableCell: ['TH', 'TD'],
  TableRow: 'TR',
  UList: 'UL',
  // Generic Element based Classes
  [ELEMENT]: [
    'Article', 'Aside',
    'Footer',
    'Header',
    'Main',
    'Nav',
    'Section',
    ELEMENT
  ]
};

const NAME = Symbol('extends');

const {customElements} = self;
const {define: $define} = customElements;
const names = new WeakMap;

/**
 * Define a custom elements in the registry.
 * @param {string} name the custom element name
 * @param {function} Class the custom element class definition
 * @returns {function} the defined `Class` after definition
 */
const define = (name, Class) => {
  names.set(Class, name);
  const args = [name, Class];
  if (NAME in Class)
    args.push({extends: Class[NAME].toLowerCase()});
  $define.apply(customElements, args);
  return Class;
};

/** @type {HTML} */
const HTML = {};

// ⚠ as for/of loop, this breaks WebKit 🤔
Object.getOwnPropertyNames(self).forEach(name => {
  if (/^HTML.*?Element$/.test(name)) {
    const Class = name.slice(4, -7) || ELEMENT;
    const Native = self[name];
    [].concat(HTMLSpecial[Class] || Class).forEach(Tag => {
      HTML[Class] = HTML[Tag] = (
        Tag === ELEMENT ?
          class extends Native {} :
          class extends Native {
            static get [NAME]() { return Tag; }
            constructor() {
              super();
              // @see https://github.com/whatwg/html/issues/5782
              if (!this.hasAttribute('is'))
                this.setAttribute('is', names.get(this.constructor));
            }
          }
      );
    });
  }
});

export { HTML, define };
