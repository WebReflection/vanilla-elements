/*! (c) Andrea Giammarchi - ISC */
try{if(!self.customElements.get("f-d")){class e extends HTMLLIElement{}self.customElements.define("f-d",e,{extends:"li"}),new e}}catch(r){const{keys:l}=Object,o=e=>{const t=l(e),n=[],{length:r}=t;for(let l=0;l<r;l++)n[l]=e[t[l]],delete e[t[l]];return()=>{for(let l=0;l<r;l++)e[t[l]]=n[l]}},s=!0,a=!1,c="querySelectorAll";function e(e){this.observe(e,{subtree:s,childList:s})}const i=(t,n,r)=>{const l=(e,n,r,o,a)=>{for(let i=0,{length:u}=e;i<u;i++){const u=e[i];(a||c in u)&&(o?n.has(u)||(n.add(u),r.delete(u),t(u,o)):r.has(u)||(r.add(u),n.delete(u),t(u,o)),a||l(u[c]("*"),n,r,o,s))}},o=new(r||MutationObserver)((e=>{for(let t=new Set,n=new Set,r=0,{length:o}=e;r<o;r++){const{addedNodes:o,removedNodes:c}=e[r];l(c,t,n,a,a),l(o,t,n,s,a)}}));return o.add=e,o.add(n||document),o},u="querySelectorAll",{document:d,Element:h,MutationObserver:f,Set:g,WeakMap:p}=self,b=e=>u in e,{filter:m}=[];var t=e=>{const t=new p,n=(n,r)=>{let o;if(r)for(let s,a=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(n),c=0,{length:i}=l;c<i;c++)a.call(n,s=l[c])&&(t.has(n)||t.set(n,new g),o=t.get(n),o.has(s)||(o.add(s),e.handle(n,r,s)));else t.has(n)&&(o=t.get(n),t.delete(n),o.forEach((t=>{e.handle(n,r,t)})))},r=(e,t=!0)=>{for(let r=0,{length:l}=e;r<l;r++)n(e[r],t)},{query:l}=e,o=e.root||d,s=i(n,o,f),{attachShadow:a}=h.prototype;return a&&(h.prototype.attachShadow=function(e){const t=a.call(this,e);return s.add(t),t}),l.length&&r(o[u](l)),{drop:e=>{for(let n=0,{length:r}=e;n<r;n++)t.delete(e[n])},flush:()=>{const e=s.takeRecords();for(let t=0,{length:n}=e;t<n;t++)r(m.call(e[t].removedNodes,b),!1),r(m.call(e[t].addedNodes,b),!0)},observer:s,parse:r}};const{customElements:y,document:w,Element:v,MutationObserver:S,Object:E,Promise:H,Map:A,Set:T,WeakMap:M,Reflect:L}=self,{attachShadow:O}=v.prototype,{createElement:x}=w,{define:C,get:q,upgrade:N}=y,{construct:P}=L||{construct(e){return e.call(this)}},{defineProperty:k,getOwnPropertyNames:D,setPrototypeOf:$}=E,I=new M,R=new T,F=new A,V=new A,j=new A,U=new A,W=[],_=[],B=e=>U.get(e)||q.call(y,e),z=(e,t,n)=>{const r=j.get(n);if(t&&!r.isPrototypeOf(e)){const t=o(e);X=$(e,r);try{new r.constructor}finally{X=null,t()}}const l=(t?"":"dis")+"connectedCallback";l in r&&e[l]()},{parse:G}=t({query:_,handle:z}),{parse:J}=t({query:W,handle(e,t){I.has(e)&&(t?R.add(e):R.delete(e),_.length&&n.call(_,e))}}),K=e=>{if(!V.has(e)){let t,n=new H((e=>{t=e}));V.set(e,{$:n,_:t})}return V.get(e).$},Q=((e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)r(e[t])},r=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t))};return(l,o)=>{const{observedAttributes:s}=l.constructor;return s&&e(o).then((()=>{new t(n).observe(l,{attributes:!0,attributeOldValue:!0,attributeFilter:s});for(let e=0,{length:t}=s;e<t;e++)l.hasAttribute(s[e])&&r({target:l,attributeName:s[e],oldValue:null})})),l}})(K,S);let X=null;function n(e){const t=I.get(e);G(t.querySelectorAll(this),e.isConnected)}D(self).filter((e=>/^HTML.*Element$/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!F.has(e))throw new TypeError("Illegal constructor");const{is:n,tag:r}=F.get(e);if(n){if(X)return Q(X,n);const t=x.call(w,r);return t.setAttribute("is",n),Q($(t,e.prototype),n)}return P.call(this,t,[],e)}$(n,t),k(n.prototype=t.prototype,"constructor",{value:n}),k(self,e,{value:n})})),k(w,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=U.get(n);if(t&&F.get(t).tag===e)return new t}const r=x.call(w,e);return n&&r.setAttribute("is",n),r}}),O&&(v.prototype.attachShadow=function(e){const t=O.call(this,e);return I.set(this,t),t}),k(y,"get",{configurable:!0,value:B}),k(y,"whenDefined",{configurable:!0,value:K}),k(y,"upgrade",{configurable:!0,value(e){const t=e.getAttribute("is");if(t){const n=U.get(t);if(n)return void Q($(e,n.prototype),t)}N.call(y,e)}}),k(y,"define",{configurable:!0,value(e,t,r){if(B(e))throw new Error(`'${e}' has already been defined as a custom element`);let l;const o=r&&r.extends;F.set(t,o?{is:e,tag:o}:{is:"",tag:e}),o?(l=`${o}[is="${e}"]`,j.set(l,t.prototype),U.set(e,t),_.push(l)):(C.apply(y,arguments),W.push(l=e)),K(e).then((()=>{o?(G(w.querySelectorAll(l)),R.forEach(n,[l])):J(w.querySelectorAll(l))})),V.get(e)._(t)}})}const r=Symbol("extends"),{customElements:l}=self,{define:o}=l,s=new Map,a=(e,t)=>{const n=[e,t];return r in t&&n.push({extends:t[r].toLowerCase()}),o.apply(l,n),s.set(t,e),t},c=(e,t)=>t?a(e,t):t=>a(e,t),i={A:"Anchor",Caption:"TableCaption",DL:"DList",Dir:"Directory",Img:"Image",OL:"OList",P:"Paragraph",TR:"TableRow",UL:"UList",Article:"",Aside:"",Footer:"",Header:"",Main:"",Nav:"",Element:"",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",TD:"TableCell",TH:"TableCell",TBody:"TableSection",TFoot:"TableSection",THead:"TableSection"},u=new Proxy(new Map,{get(e,t){if(!e.has(t)){const n=self["HTML"+(t in i?i[t]:t)+"Element"];e.set(t,"Element"===t?class extends n{}:class extends n{static get[r](){return t}constructor(){super().hasAttribute("is")||this.setAttribute("is",s.get(this.constructor))}})}return e.get(t)}});export{r as EXTENDS,u as HTML,c as define};