/*! (c) Andrea Giammarchi - ISC */

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

export const define = (name, Class) => {
  const args = [name, Class];
  if (NAME in Class)
    args.push({extends: Class[NAME].toLowerCase()});
  $define.apply(customElements, args);
  return Class;
};

export const HTML = {};

// ⚠ as for/of loop, this breaks WebKit 🤔
Object.getOwnPropertyNames(self).forEach(name => {
  if (/^HTML/.test(name)) {
    const Class = name.slice(4, -7) || ELEMENT;
    const Native = self[name];
    [].concat(HTMLSpecial[Class] || Class).forEach(Tag => {
      HTML[Class] = HTML[Tag] = (
        Tag === ELEMENT ?
          class extends Native {} :
          class extends Native {
            static get [NAME]() { return Tag; }
          }
      );
    });
  }
});
