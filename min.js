/*! (c) Andrea Giammarchi - ISC */
export const EXTENDS=Symbol("extends");const e={Anchor:"A",DList:"DL",Directory:"Dir",Heading:["H6","H5","H4","H3","H2","H1"],Image:"Img",OList:"OL",Paragraph:"P",TableCaption:"Caption",TableCell:["TH","TD"],TableRow:"TR",UList:"UL",Element:["Article","Aside","Footer","Header","Main","Nav","Section","Element"]},{customElements:t}=self,{define:s}=t,n=new WeakMap,o=(e,o)=>{const r=[e,o];return EXTENDS in o&&r.push({extends:o[EXTENDS].toLowerCase()}),s.apply(t,r),n.set(o,e),o};export const define=(e,t)=>t?o(e,t):t=>o(e,t);export const HTML={};Object.getOwnPropertyNames(self).forEach((t=>{if(/^HTML(.*?)Element$/.test(t)){const s=RegExp.$1||"Element",o=self[t];[].concat(e[s]||s).forEach((e=>{HTML[s]=HTML[e]="Element"===e?class extends o{}:class extends o{static get[EXTENDS](){return e}constructor(){super().hasAttribute("is")||this.setAttribute("is",n.get(this.constructor))}}}))}}));