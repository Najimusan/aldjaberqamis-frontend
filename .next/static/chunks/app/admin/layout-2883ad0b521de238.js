(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{5883:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(2898).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},4322:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(2898).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},5750:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(2898).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},2549:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(2898).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},4115:function(e,t,a){Promise.resolve().then(a.bind(a,8316))},8316:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return g}});var r=a(7437),i=a(2265),s=a(4033),o=a(1396),n=a.n(o),l=a(5251);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,a(2898).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var d=a(4322),u=a(3505),m=a(5750),p=a(2549),f=a(8004),h=a(5883),y=a(5925),g=e=>{let{children:t}=e,[a,o]=(0,i.useState)(!1),[g,x]=(0,i.useState)(!0),[b,v]=(0,i.useState)(!1),k=(0,s.useRouter)(),w=(0,s.usePathname)(),[j,N]=(0,i.useState)(""),[E,C]=(0,i.useState)(!0),O=[{name:"Tableau de bord",href:"/admin/dashboard",icon:c,roles:["super_admin","admin","manager"]},{name:"Produits",href:"/admin/produits",icon:d.Z,roles:["super_admin","admin"]},{name:"Commandes",href:"/admin/commandes",icon:u.Z,roles:["super_admin","admin","manager"]},{name:"Utilisateurs",href:"/admin/utilisateurs",icon:m.Z,roles:["super_admin"]}];return((0,i.useEffect)(()=>{if("/admin/login"===w){x(!1);return}(async()=>{let e=localStorage.getItem("adminToken");if(!e){k.push("/admin/login");return}try{let t=await fetch("http://localhost:5000/api/auth/verify",{headers:{Authorization:"Bearer ".concat(e)}});if(t.ok){let e=await t.json();console.log("Layout - Donn\xe9es utilisateur:",e),N(e.data.user.role),o(!0)}else localStorage.removeItem("adminToken"),k.push("/admin/login")}catch(e){localStorage.removeItem("adminToken"),k.push("/admin/login")}finally{x(!1),C(!1)}})()},[k,w]),"/admin/login"===w)?(0,r.jsx)(r.Fragment,{children:t}):g?(0,r.jsx)("div",{className:"min-h-screen bg-black flex items-center justify-center",children:(0,r.jsx)("div",{className:"text-white text-xl",children:"Chargement..."})}):a?(0,r.jsxs)("div",{className:"min-h-screen bg-black",children:[(0,r.jsx)("div",{className:"lg:hidden fixed top-4 left-4 z-50",children:(0,r.jsx)(l.E.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>v(!b),className:"p-2 bg-gray-800 text-white rounded-lg",children:b?(0,r.jsx)(p.Z,{className:"w-6 h-6"}):(0,r.jsx)(f.Z,{className:"w-6 h-6"})})}),(0,r.jsx)("div",{className:"fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ".concat(b?"translate-x-0":"-translate-x-full"),children:(0,r.jsxs)("div",{className:"flex flex-col h-full",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-16 px-4 border-b border-gray-700",children:(0,r.jsx)("h1",{className:"text-xl font-bold text-white",children:"Al Djaber Qamis"})}),(0,r.jsx)("nav",{className:"flex-1 px-4 py-6 space-y-2",children:E?(0,r.jsx)("div",{className:"text-center text-gray-400",children:"Chargement..."}):O.filter(e=>!j||e.roles.includes(j)).map(e=>{let t=w===e.href;return(0,r.jsxs)(n(),{href:e.href,onClick:()=>{console.log("Navigation vers:",e.href),v(!1)},className:"flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ".concat(t?"bg-white text-black":"text-gray-300 hover:bg-gray-700 hover:text-white"),children:[(0,r.jsx)(e.icon,{className:"w-5 h-5 mr-3"}),e.name]},e.name)})}),(0,r.jsx)("div",{className:"p-4 border-t border-gray-700",children:(0,r.jsxs)(l.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>{localStorage.removeItem("adminToken"),k.push("/admin/login")},className:"flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 rounded-lg transition-colors",children:[(0,r.jsx)(h.Z,{className:"w-5 h-5 mr-3"}),"D\xe9connexion"]})})]})}),b&&(0,r.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden",onClick:()=>v(!1)}),(0,r.jsx)("div",{className:"lg:ml-64",children:(0,r.jsx)("main",{className:"min-h-screen",children:t})}),(0,r.jsx)(y.Toaster,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#1f2937",color:"#fff",border:"1px solid #374151"}}})]}):null}},6993:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return r}});let r=a(1024)._(a(2265)).default.createContext(null)},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let r,i;a.r(t),a.d(t,{CheckmarkIcon:function(){return J},ErrorIcon:function(){return V},LoaderIcon:function(){return X},ToastBar:function(){return el},ToastIcon:function(){return ea},Toaster:function(){return em},default:function(){return ep},resolveValue:function(){return N},toast:function(){return H},useToaster:function(){return R},useToasterStore:function(){return M}});var s,o=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",r="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?a=s+" "+o+";":r+="f"==s[1]?m(o,s):s+"{"+m(o,"k"==s[1]?"":t)+"}":"object"==typeof o?r+=m(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(s,o):s+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+r},p={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},h=(e,t,a,r,i)=>{var s;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,a,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),s=p[n],l?t.data=t.data.replace(l,s):-1===t.data.indexOf(s)&&(t.data=r?s+t.data:t.data+s),n},y=(e,t,a)=>e.reduce((e,r,i)=>{let s=t[i];if(s&&s.call){let e=s(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==s?"":s)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?y(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let x,b,v,k=g.bind({k:1});function w(e,t){let a=this||{};return function(){let r=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;a.p=Object.assign({theme:b&&b()},n),a.o=/ *go\d+/.test(l),n.className=g.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),x(c,n)}return t?t(i):i}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,E=(r=0,()=>(++r).toString()),C=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},O="default",I=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return I(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},T=[],$={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},D={},Z=(e,t=O)=>{D[t]=I(D[t]||$,e),T.forEach(([e,a])=>{e===t&&a(D[t])})},_=e=>Object.keys(D).forEach(t=>Z(e,t)),z=e=>Object.keys(D).find(t=>D[t].toasts.some(t=>t.id===e)),A=(e=O)=>t=>{Z(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={},t=O)=>{let[a,r]=(0,o.useState)(D[t]||$),i=(0,o.useRef)(D[t]);(0,o.useEffect)(()=>(i.current!==D[t]&&r(D[t]),T.push([t,r]),()=>{let e=T.findIndex(([e])=>e===t);e>-1&&T.splice(e,1)}),[t]);let s=a.toasts.map(t=>{var a,r,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:s}},P=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),L=e=>(t,a)=>{let r=P(t,e,a);return A(r.toasterId||z(r.id))({type:2,toast:r}),r.id},H=(e,t)=>L("blank")(e,t);H.error=L("error"),H.success=L("success"),H.loading=L("loading"),H.custom=L("custom"),H.dismiss=(e,t)=>{let a={type:3,toastId:e};t?A(t)(a):_(a)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let a={type:4,toastId:e};t?A(t)(a):_(a)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,a)=>{let r=H.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?N(t.success,e):void 0;return i?H.success(i,{id:r,...a,...null==a?void 0:a.success}):H.dismiss(r),e}).catch(e=>{let i=t.error?N(t.error,e):void 0;i?H.error(i,{id:r,...a,...null==a?void 0:a.error}):H.dismiss(r)}),e};var F=1e3,R=(e,t="default")=>{let{toasts:a,pausedAt:r}=M(e,t),i=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=F)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&H.dismiss(a.id);return}return setTimeout(()=>H.dismiss(a.id,t),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let n=(0,o.useCallback)(A(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:s}=t||{},o=a.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,s]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},U=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,X=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,Y=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=w("div")`
  position: absolute;
`,W=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===a?null:o.createElement(W,null,o.createElement(X,{...r}),"loading"!==a&&o.createElement(K,null,"error"===a?o.createElement(V,{...r}):o.createElement(J,{...r})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[r,i]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(a),ei(a)];return{animation:t?`${k(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(ea,{toast:e}),n=o.createElement(eo,{...e.ariaProps},N(e.message,e));return o.createElement(es,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});s=o.createElement,m.p=void 0,x=s,b=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let s=o.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return o.createElement("div",{ref:s,className:t,style:a},i)},ed=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},eu=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=R(a,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let s=a.position||t,n=ed(s,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return o.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?eu:"",style:n},"custom"===a.type?N(a.message,a):i?i(a):o.createElement(el,{toast:a,position:s}))}))},ep=H}},function(e){e.O(0,[581,561,971,938,744],function(){return e(e.s=4115)}),_N_E=e.O()}]);