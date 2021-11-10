/*! (c) Andrea Giammarchi - ISC */
try{if(!self.customElements.get("f-d")){class e extends HTMLLIElement{}self.customElements.define("f-d",e,{extends:"li"}),new e}}catch(n){const{keys:s}=Object,l=e=>{const t=s(e),r=[],{length:n}=t;for(let s=0;s<n;s++)r[s]=e[t[s]],delete e[t[s]];return()=>{for(let s=0;s<n;s++)e[t[s]]=r[s]}},o=!0,a=!1,c="querySelectorAll";function e(e){this.observe(e,{subtree:o,childList:o})}const i=(t,r,n)=>{const s=(e,r,n,l,a)=>{for(let i=0,{length:u}=e;i<u;i++){const u=e[i];(a||c in u)&&(l?r.has(u)||(r.add(u),n.delete(u),t(u,l)):n.has(u)||(n.add(u),r.delete(u),t(u,l)),a||s(u[c]("*"),r,n,l,o))}},l=new(n||MutationObserver)((e=>{for(let t=new Set,r=new Set,n=0,{length:l}=e;n<l;n++){const{addedNodes:l,removedNodes:c}=e[n];s(c,t,r,a,a),s(l,t,r,o,a)}}));return l.add=e,l.add(r||document),l},u="querySelectorAll",{document:d,Element:h,MutationObserver:f,Set:g,WeakMap:p}=self,b=e=>u in e,{filter:m}=[];var t=e=>{const t=new p,r=(r,n)=>{let l;if(n)for(let o,a=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(r),c=0,{length:i}=s;c<i;c++)a.call(r,o=s[c])&&(t.has(r)||t.set(r,new g),l=t.get(r),l.has(o)||(l.add(o),e.handle(r,n,o)));else t.has(r)&&(l=t.get(r),t.delete(r),l.forEach((t=>{e.handle(r,n,t)})))},n=(e,t=!0)=>{for(let n=0,{length:s}=e;n<s;n++)r(e[n],t)},{query:s}=e,l=e.root||d,o=i(r,l,f),{attachShadow:a}=h.prototype;return a&&(h.prototype.attachShadow=function(e){const t=a.call(this,e);return o.add(t),t}),s.length&&n(l[u](s)),{drop:e=>{for(let r=0,{length:n}=e;r<n;r++)t.delete(e[r])},flush:()=>{const e=o.takeRecords();for(let t=0,{length:r}=e;t<r;t++)n(m.call(e[t].removedNodes,b),!1),n(m.call(e[t].addedNodes,b),!0)},observer:o,parse:n}};const{customElements:w,document:y,Element:E,MutationObserver:v,Object:S,Promise:A,Map:M,Set:O,WeakMap:H,Reflect:L}=self,{attachShadow:T}=E.prototype,{createElement:N}=y,{define:k,get:q}=w,{construct:x}=L||{construct(e){return e.call(this)}},{defineProperty:C,getOwnPropertyNames:P,setPrototypeOf:D}=S,$=new H,I=new O,R=new M,j=new M,V=new M,W=new M,F=[],U=[],_=e=>W.get(e)||q.call(w,e),z=(e,t,r)=>{const n=V.get(r);if(t&&!n.isPrototypeOf(e)){const t=l(e);Q=D(e,n);try{new n.constructor}finally{Q=null,t()}}const s=(t?"":"dis")+"connectedCallback";s in n&&e[s]()},{parse:B}=t({query:U,handle:z}),{parse:G}=t({query:F,handle(e,t){$.has(e)&&(t?I.add(e):I.delete(e),U.length&&r.call(U,e))}}),J=e=>{if(!j.has(e)){let t,r=new A((e=>{t=e}));j.set(e,{$:r,_:t})}return j.get(e).$},K=((e,t)=>{const r=e=>{for(let t=0,{length:r}=e;t<r;t++)n(e[t])},n=({target:e,attributeName:t,oldValue:r})=>{e.attributeChangedCallback(t,r,e.getAttribute(t))};return(s,l)=>{const{observedAttributes:o}=s.constructor;return o&&e(l).then((()=>{new t(r).observe(s,{attributes:!0,attributeOldValue:!0,attributeFilter:o});for(let e=0,{length:t}=o;e<t;e++)s.hasAttribute(o[e])&&n({target:s,attributeName:o[e],oldValue:null})})),s}})(J,v);let Q=null;function r(e){const t=$.get(e);B(t.querySelectorAll(this),e.isConnected)}P(self).filter((e=>/^HTML/.test(e))).forEach((e=>{const t=self[e];function r(){const{constructor:e}=this;if(!R.has(e))throw new TypeError("Illegal constructor");const{is:r,tag:n}=R.get(e);if(r){if(Q)return K(Q,r);const t=N.call(y,n);return t.setAttribute("is",r),K(D(t,e.prototype),r)}return x.call(this,t,[],e)}D(r,t),C(r.prototype=t.prototype,"constructor",{value:r}),C(self,e,{value:r})})),C(y,"createElement",{configurable:!0,value(e,t){const r=t&&t.is;if(r){const t=W.get(r);if(t&&R.get(t).tag===e)return new t}const n=N.call(y,e);return r&&n.setAttribute("is",r),n}}),T&&(E.prototype.attachShadow=function(e){const t=T.call(this,e);return $.set(this,t),t}),C(w,"get",{configurable:!0,value:_}),C(w,"whenDefined",{configurable:!0,value:J}),C(w,"define",{configurable:!0,value(e,t,n){if(_(e))throw new Error(`'${e}' has already been defined as a custom element`);let s;const l=n&&n.extends;R.set(t,l?{is:e,tag:l}:{is:"",tag:e}),l?(s=`${l}[is="${e}"]`,V.set(s,t.prototype),W.set(e,t),U.push(s)):(k.apply(w,arguments),F.push(s=e)),J(e).then((()=>{l?(B(y.querySelectorAll(s)),I.forEach(r,[s])):G(y.querySelectorAll(s))})),j.get(e)._(t)}})}const n=Symbol("extends"),s={Anchor:"A",DList:"DL",Directory:"Dir",Heading:["H6","H5","H4","H3","H2","H1"],Image:"Img",OList:"OL",Paragraph:"P",TableCaption:"Caption",TableCell:["TH","TD"],TableRow:"TR",UList:"UL",Element:["Article","Aside","Footer","Header","Main","Nav","Section","Element"]},{customElements:l}=self,{define:o}=l,a=new WeakMap,c=(e,t)=>{const r=[e,t];return n in t&&r.push({extends:t[n].toLowerCase()}),o.apply(l,r),a.set(t,e),t},i=(e,t)=>t?c(e,t):t=>c(e,t),u={};Object.getOwnPropertyNames(self).forEach((e=>{if(/^HTML.*?Element$/.test(e)){const t=e.slice(4,-7)||"Element",r=self[e];[].concat(s[t]||t).forEach((e=>{u[t]=u[e]="Element"===e?class extends r{}:class extends r{static get[n](){return e}constructor(){super().hasAttribute("is")||this.setAttribute("is",a.get(this.constructor))}}}))}}));export{n as EXTENDS,u as HTML,i as define};