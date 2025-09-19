(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{5883:function(e,r,n){"use strict";n.d(r,{Z:function(){return c}});var d=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,d.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},4322:function(e,r,n){"use strict";n.d(r,{Z:function(){return c}});var d=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,d.Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},5750:function(e,r,n){"use strict";n.d(r,{Z:function(){return c}});var d=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,d.Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},2549:function(e,r,n){"use strict";n.d(r,{Z:function(){return c}});var d=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,d.Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},4115:function(e,r,n){Promise.resolve().then(n.bind(n,6941))},6941:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return layout}});var d=n(7437),c=n(2265),m=n(4033),f=n(1396),h=n.n(f),y=n(5251),g=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,g.Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var b=n(4322),v=n(3505),k=n(5750),N=n(2549),C=n(8004),O=n(5883),I=n(5925),layout=e=>{let{children:r}=e,[n,f]=(0,c.useState)(!1),[g,T]=(0,c.useState)(!0),[D,A]=(0,c.useState)(!1),M=(0,m.useRouter)(),z=(0,m.usePathname)(),[L,F]=(0,c.useState)(""),[R,U]=(0,c.useState)(!0),q=[{name:"Tableau de bord",href:"/admin/dashboard",icon:x,roles:["super_admin","admin","manager"]},{name:"Produits",href:"/admin/produits",icon:b.Z,roles:["super_admin","admin"]},{name:"Commandes",href:"/admin/commandes",icon:v.Z,roles:["super_admin","admin","manager"]},{name:"Utilisateurs",href:"/admin/utilisateurs",icon:k.Z,roles:["super_admin"]}];return((0,c.useEffect)(()=>{if("/admin/login"===z){T(!1);return}let checkAuth=async()=>{let e=localStorage.getItem("adminToken");if(!e){M.push("/admin/login");return}try{let r=await fetch("http://localhost:5000/api/auth/verify",{headers:{Authorization:"Bearer ".concat(e)}});if(r.ok){let e=await r.json();console.log("Layout - Donn\xe9es utilisateur:",e),F(e.data.user.role),f(!0)}else localStorage.removeItem("adminToken"),M.push("/admin/login")}catch(e){localStorage.removeItem("adminToken"),M.push("/admin/login")}finally{T(!1),U(!1)}};checkAuth()},[M,z]),"/admin/login"===z)?(0,d.jsx)(d.Fragment,{children:r}):g?(0,d.jsx)("div",{className:"min-h-screen bg-black flex items-center justify-center",children:(0,d.jsx)("div",{className:"text-white text-xl",children:"Chargement..."})}):n?(0,d.jsxs)("div",{className:"min-h-screen bg-black",children:[(0,d.jsx)("div",{className:"lg:hidden fixed top-4 left-4 z-50",children:(0,d.jsx)(y.E.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>A(!D),className:"p-2 bg-gray-800 text-white rounded-lg",children:D?(0,d.jsx)(N.Z,{className:"w-6 h-6"}):(0,d.jsx)(C.Z,{className:"w-6 h-6"})})}),(0,d.jsx)("div",{className:"fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ".concat(D?"translate-x-0":"-translate-x-full"),children:(0,d.jsxs)("div",{className:"flex flex-col h-full",children:[(0,d.jsx)("div",{className:"flex items-center justify-center h-16 px-4 border-b border-gray-700",children:(0,d.jsx)("h1",{className:"text-xl font-bold text-white",children:"Al Djaber Qamis"})}),(0,d.jsx)("nav",{className:"flex-1 px-4 py-6 space-y-2",children:R?(0,d.jsx)("div",{className:"text-center text-gray-400",children:"Chargement..."}):q.filter(e=>!L||e.roles.includes(L)).map(e=>{let r=z===e.href;return(0,d.jsxs)(h(),{href:e.href,onClick:()=>{console.log("Navigation vers:",e.href),A(!1)},className:"flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ".concat(r?"bg-white text-black":"text-gray-300 hover:bg-gray-700 hover:text-white"),children:[(0,d.jsx)(e.icon,{className:"w-5 h-5 mr-3"}),e.name]},e.name)})}),(0,d.jsx)("div",{className:"p-4 border-t border-gray-700",children:(0,d.jsxs)(y.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>{localStorage.removeItem("adminToken"),M.push("/admin/login")},className:"flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 rounded-lg transition-colors",children:[(0,d.jsx)(O.Z,{className:"w-5 h-5 mr-3"}),"D\xe9connexion"]})})]})}),D&&(0,d.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden",onClick:()=>A(!1)}),(0,d.jsx)("div",{className:"lg:ml-64",children:(0,d.jsx)("main",{className:"min-h-screen",children:r})}),(0,d.jsx)(I.Toaster,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#1f2937",color:"#fff",border:"1px solid #374151"}}})]}):null}},6304:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return m}});let d=n(1024),c=d._(n(2265)),m=c.default.createContext(null)},4033:function(e,r,n){e.exports=n(94)},5925:function(e,r,n){"use strict";let d,c;n.r(r),n.d(r,{CheckmarkIcon:function(){return J},ErrorIcon:function(){return U},LoaderIcon:function(){return B},ToastBar:function(){return ei},ToastIcon:function(){return $},Toaster:function(){return Fe},default:function(){return eo},resolveValue:function(){return dist_h},toast:function(){return dist_n},useToaster:function(){return w},useToasterStore:function(){return V}});var m,f=n(2265);let h={data:""},t=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||h,y=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,g=/\/\*[^]*?\*\/|  +/g,x=/\n+/g,o=(e,r)=>{let n="",d="",c="";for(let m in e){let f=e[m];"@"==m[0]?"i"==m[1]?n=m+" "+f+";":d+="f"==m[1]?o(f,m):m+"{"+o(f,"k"==m[1]?"":r)+"}":"object"==typeof f?d+=o(f,r?r.replace(/([^,])+/g,e=>m.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):m):null!=f&&(m=/^--/.test(m)?m:m.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=o.p?o.p(m,f):m+":"+f+";")}return n+(r&&c?r+"{"+c+"}":c)+d},b={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,d,c)=>{var m;let f=s(e),h=b[f]||(b[f]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(f));if(!b[h]){let r=f!==e?e:(e=>{let r,n,d=[{}];for(;r=y.exec(e.replace(g,""));)r[4]?d.shift():r[3]?(n=r[3].replace(x," ").trim(),d.unshift(d[0][n]=d[0][n]||{})):d[0][r[1]]=r[2].replace(x," ").trim();return d[0]})(e);b[h]=o(c?{["@keyframes "+h]:r}:r,n?"":"."+h)}let v=n&&b.g?b.g:null;return n&&(b.g=b[h]),m=b[h],v?r.data=r.data.replace(v,m):-1===r.data.indexOf(m)&&(r.data=d?m+r.data:r.data+m),h},p=(e,r,n)=>e.reduce((e,d,c)=>{let m=r[c];if(m&&m.call){let e=m(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;m=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+d+(null==m?"":m)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let v,k,N,C=u.bind({k:1});function j(e,r){let n=this||{};return function(){let d=arguments;function a(c,m){let f=Object.assign({},c),h=f.className||a.className;n.p=Object.assign({theme:k&&k()},f),n.o=/ *go\d+/.test(h),f.className=u.apply(n,d)+(h?" "+h:""),r&&(f.ref=m);let y=e;return e[0]&&(y=f.as||e,delete f.as),N&&y[0]&&N(f),v(y,f)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,O=(d=0,()=>(++d).toString()),E=()=>{if(void 0===c&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");c=!e||e.matches}return c},I="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:d}=r;return H(e,{type:e.toasts.find(e=>e.id===d.id)?1:0,toast:d});case 3:let{toastId:c}=r;return{...e,toasts:e.toasts.map(e=>e.id===c||void 0===c?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let m=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+m}))}}},T=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},Y=(e,r=I)=>{A[r]=H(A[r]||D,e),T.forEach(([e,n])=>{e===r&&n(A[r])})},_=e=>Object.keys(A).forEach(r=>Y(e,r)),Q=e=>Object.keys(A).find(r=>A[r].toasts.some(r=>r.id===e)),S=(e=I)=>r=>{Y(r,e)},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=I)=>{let[n,d]=(0,f.useState)(A[r]||D),c=(0,f.useRef)(A[r]);(0,f.useEffect)(()=>(c.current!==A[r]&&d(A[r]),T.push([r,d]),()=>{let e=T.findIndex(([e])=>e===r);e>-1&&T.splice(e,1)}),[r]);let m=n.toasts.map(r=>{var n,d,c;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(n=e[r.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(d=e[r.type])?void 0:d.duration)||(null==e?void 0:e.duration)||M[r.type],style:{...e.style,...null==(c=e[r.type])?void 0:c.style,...r.style}}});return{...n,toasts:m}},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||O()}),P=e=>(r,n)=>{let d=ie(r,e,n);return S(d.toasterId||Q(d.id))({type:2,toast:d}),d.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let d=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let c=r.success?dist_h(r.success,e):void 0;return c?dist_n.success(c,{id:d,...n,...null==n?void 0:n.success}):dist_n.dismiss(d),e}).catch(e=>{let c=r.error?dist_h(r.error,e):void 0;c?dist_n.error(c,{id:d,...n,...null==n?void 0:n.error}):dist_n.dismiss(d)}),e};var z=1e3,w=(e,r="default")=>{let{toasts:n,pausedAt:d}=V(e,r),c=(0,f.useRef)(new Map).current,m=(0,f.useCallback)((e,r=z)=>{if(c.has(e))return;let n=setTimeout(()=>{c.delete(e),h({type:4,toastId:e})},r);c.set(e,n)},[]);(0,f.useEffect)(()=>{if(d)return;let e=Date.now(),c=n.map(n=>{if(n.duration===1/0)return;let d=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(d<0){n.visible&&dist_n.dismiss(n.id);return}return setTimeout(()=>dist_n.dismiss(n.id,r),d)});return()=>{c.forEach(e=>e&&clearTimeout(e))}},[n,d,r]);let h=(0,f.useCallback)(S(r),[r]),y=(0,f.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),g=(0,f.useCallback)((e,r)=>{h({type:1,toast:{id:e,height:r}})},[h]),x=(0,f.useCallback)(()=>{d&&h({type:6,time:Date.now()})},[d,h]),b=(0,f.useCallback)((e,r)=>{let{reverseOrder:d=!1,gutter:c=8,defaultPosition:m}=r||{},f=n.filter(r=>(r.position||m)===(e.position||m)&&r.height),h=f.findIndex(r=>r.id===e.id),y=f.filter((e,r)=>r<h&&e.visible).length;return f.filter(e=>e.visible).slice(...d?[y+1]:[0,y]).reduce((e,r)=>e+(r.height||0)+c,0)},[n]);return(0,f.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)m(e.id,e.removeDelay);else{let r=c.get(e.id);r&&(clearTimeout(r),c.delete(e.id))}})},[n,m]),{toasts:n,handlers:{updateHeight:g,startPause:y,endPause:x,calculateOffset:b}}},L=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
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
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,X=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=C`
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
}`,J=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=j("div")`
  position: absolute;
`,W=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=C`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:d}=e;return void 0!==r?"string"==typeof r?f.createElement(et,null,r):r:"blank"===n?null:f.createElement(W,null,f.createElement(B,{...d}),"loading"!==n&&f.createElement(K,null,"error"===n?f.createElement(U,{...d}):f.createElement(J,{...d})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=j("div")`
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
`,er=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[d,c]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${C(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=f.memo(({toast:e,position:r,style:n,children:d})=>{let c=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},m=f.createElement($,{toast:e}),h=f.createElement(er,{...e.ariaProps},dist_h(e.message,e));return f.createElement(ea,{className:e.className,style:{...c,...n,...e.style}},"function"==typeof d?d({icon:m,message:h}):f.createElement(f.Fragment,null,m,h))});m=f.createElement,o.p=void 0,v=m,k=void 0,N=void 0;var we=({id:e,className:r,style:n,onHeightUpdate:d,children:c})=>{let m=f.useCallback(r=>{if(r){let l=()=>{d(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,d]);return f.createElement("div",{ref:m,className:r,style:n},c)},Me=(e,r)=>{let n=e.includes("top"),d=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...d}},es=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:d,children:c,toasterId:m,containerStyle:h,containerClassName:y})=>{let{toasts:g,handlers:x}=w(n,m);return f.createElement("div",{"data-rht-toaster":m||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...h},className:y,onMouseEnter:x.startPause,onMouseLeave:x.endPause},g.map(n=>{let m=n.position||r,h=Me(m,x.calculateOffset(n,{reverseOrder:e,gutter:d,defaultPosition:r}));return f.createElement(we,{id:n.id,key:n.id,onHeightUpdate:x.updateHeight,className:n.visible?es:"",style:h},"custom"===n.type?dist_h(n.message,n):c?c(n):f.createElement(ei,{toast:n,position:m}))}))},eo=dist_n}},function(e){e.O(0,[581,561,971,472,744],function(){return e(e.s=4115)}),_N_E=e.O()}]);