/*! (c) Andrea Giammarchi - ISC */
try{if(!self.customElements.get("f-d")){class e extends HTMLLIElement{}self.customElements.define("f-d",e,{extends:"li"}),new e}}catch(r){const{keys:s}=Object,l=e=>{const t=s(e),n=[],{length:r}=t;for(let s=0;s<r;s++)n[s]=e[t[s]],delete e[t[s]];return()=>{for(let s=0;s<r;s++)e[t[s]]=n[s]}},o=!0,a=!1,c="querySelectorAll";function e(e){this.observe(e,{subtree:o,childList:o})}const i=(t,n,r)=>{const s=(e,n,r,l,a)=>{for(let i=0,{length:u}=e;i<u;i++){const u=e[i];(a||c in u)&&(l?n.has(u)||(n.add(u),r.delete(u),t(u,l)):r.has(u)||(r.add(u),n.delete(u),t(u,l)),a||s(u[c]("*"),n,r,l,o))}},l=new(r||MutationObserver)((e=>{for(let t=new Set,n=new Set,r=0,{length:l}=e;r<l;r++){const{addedNodes:l,removedNodes:c}=e[r];s(c,t,n,a,a),s(l,t,n,o,a)}}));return l.add=e,l.add(n||document),l},u="querySelectorAll",{document:d,Element:h,MutationObserver:f,Set:g,WeakMap:p}=self,b=e=>u in e,{filter:m}=[];var t=e=>{const t=new p,n=(n,r)=>{let l;if(r)for(let o,a=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(n),c=0,{length:i}=s;c<i;c++)a.call(n,o=s[c])&&(t.has(n)||t.set(n,new g),l=t.get(n),l.has(o)||(l.add(o),e.handle(n,r,o)));else t.has(n)&&(l=t.get(n),t.delete(n),l.forEach((t=>{e.handle(n,r,t)})))},r=(e,t=!0)=>{for(let r=0,{length:s}=e;r<s;r++)n(e[r],t)},{query:s}=e,l=e.root||d,o=i(n,l,f),{attachShadow:a}=h.prototype;return a&&(h.prototype.attachShadow=function(e){const t=a.call(this,e);return o.add(t),t}),s.length&&r(l[u](s)),{drop:e=>{for(let n=0,{length:r}=e;n<r;n++)t.delete(e[n])},flush:()=>{const e=o.takeRecords();for(let t=0,{length:n}=e;t<n;t++)r(m.call(e[t].removedNodes,b),!1),r(m.call(e[t].addedNodes,b),!0)},observer:o,parse:r}};const{customElements:w,document:y,Element:E,MutationObserver:v,Object:H,Promise:A,Map:S,Set:M,WeakMap:L,Reflect:O}=self,{attachShadow:T}=E.prototype,{createElement:x}=y,{define:C,get:q}=w,{construct:N}=O||{construct(e){return e.call(this)}},{defineProperty:P,getOwnPropertyNames:k,setPrototypeOf:D}=H,$=new L,I=new M,R=new S,V=new S,j=new S,F=new S,U=[],W=[],_=e=>F.get(e)||q.call(w,e),z=(e,t,n)=>{const r=j.get(n);if(t&&!r.isPrototypeOf(e)){const t=l(e);Q=D(e,r);try{new r.constructor}finally{Q=null,t()}}const s=(t?"":"dis")+"connectedCallback";s in r&&e[s]()},{parse:B}=t({query:W,handle:z}),{parse:G}=t({query:U,handle(e,t){$.has(e)&&(t?I.add(e):I.delete(e),W.length&&n.call(W,e))}}),J=e=>{if(!V.has(e)){let t,n=new A((e=>{t=e}));V.set(e,{$:n,_:t})}return V.get(e).$},K=((e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)r(e[t])},r=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t))};return(s,l)=>{const{observedAttributes:o}=s.constructor;return o&&e(l).then((()=>{new t(n).observe(s,{attributes:!0,attributeOldValue:!0,attributeFilter:o});for(let e=0,{length:t}=o;e<t;e++)s.hasAttribute(o[e])&&r({target:s,attributeName:o[e],oldValue:null})})),s}})(J,v);let Q=null;function n(e){const t=$.get(e);B(t.querySelectorAll(this),e.isConnected)}k(self).filter((e=>/^HTML.*Element$/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!R.has(e))throw new TypeError("Illegal constructor");const{is:n,tag:r}=R.get(e);if(n){if(Q)return K(Q,n);const t=x.call(y,r);return t.setAttribute("is",n),K(D(t,e.prototype),n)}return N.call(this,t,[],e)}D(n,t),P(n.prototype=t.prototype,"constructor",{value:n}),P(self,e,{value:n})})),P(y,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=F.get(n);if(t&&R.get(t).tag===e)return new t}const r=x.call(y,e);return n&&r.setAttribute("is",n),r}}),T&&(E.prototype.attachShadow=function(e){const t=T.call(this,e);return $.set(this,t),t}),P(w,"get",{configurable:!0,value:_}),P(w,"whenDefined",{configurable:!0,value:J}),P(w,"define",{configurable:!0,value(e,t,r){if(_(e))throw new Error(`'${e}' has already been defined as a custom element`);let s;const l=r&&r.extends;R.set(t,l?{is:e,tag:l}:{is:"",tag:e}),l?(s=`${l}[is="${e}"]`,j.set(s,t.prototype),F.set(e,t),W.push(s)):(C.apply(w,arguments),U.push(s=e)),J(e).then((()=>{l?(B(y.querySelectorAll(s)),I.forEach(n,[s])):G(y.querySelectorAll(s))})),V.get(e)._(t)}})}const r=Symbol("extends"),{customElements:s}=self,{define:l}=s,o=new Map,a=(e,t)=>{const n=[e,t];return r in t&&n.push({extends:t[r].toLowerCase()}),l.apply(s,n),o.set(t,e),t},c=(e,t)=>t?a(e,t):t=>a(e,t),i={A:"Anchor",Caption:"TableCaption",DL:"DList",Dir:"Directory",Img:"Image",OL:"OList",P:"Paragraph",TR:"TableRow",UL:"UList",Article:"",Aside:"",Footer:"",Header:"",Main:"",Nav:"",Element:"",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",TD:"TableCell",TH:"TableCell"},u=new Proxy(new Map,{get(e,t){if(!e.has(t)){const n=self["HTML"+(t in i?i[t]:t)+"Element"];e.set(t,"Element"===t?class extends n{}:class extends n{static get[r](){return t}constructor(){super().hasAttribute("is")||this.setAttribute("is",o.get(this.constructor))}})}return e.get(t)}});export{r as EXTENDS,u as HTML,c as define};