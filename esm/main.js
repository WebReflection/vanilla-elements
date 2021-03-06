/*! (c) Andrea Giammarchi - ISC */

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
 * @property {HTMLDivElement} Div - a builtin custom element
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

import {ELEMENT, qualify} from '@webreflection/html-shortcuts';

export const EXTENDS = Symbol('extends');

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
export const define = (name, Class) => Class ?
  $(name, Class) :
  Class => $(name, Class);

/** @type {HTML} */
export const HTML = new Proxy(new Map, {
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
