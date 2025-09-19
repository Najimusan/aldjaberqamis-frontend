(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[101],{3067:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(2898).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},9670:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(2898).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},4322:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(2898).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},1827:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(2898).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},1138:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(2898).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},3578:function(e,t,s){Promise.resolve().then(s.bind(s,7241))},7241:function(e,t,s){"use strict";s.r(t);var a=s(7437),r=s(2265),i=s(4033),l=s(5251),n=s(3067),o=s(4322),c=s(1827),d=s(9670),u=s(1138),m=s(5925);t.default=()=>{let[e,t]=(0,r.useState)([]),[s,p]=(0,r.useState)(!0),[x,h]=(0,r.useState)(""),[f,y]=(0,r.useState)(""),[g,v]=(0,r.useState)(1),[b,j]=(0,r.useState)(1),[w,N]=(0,r.useState)(null),[k,C]=(0,r.useState)(null),[E,S]=(0,r.useState)(!1),A=(0,i.useRouter)(),D=[{value:"en attente",label:"En attente",color:"text-yellow-400"},{value:"confirm\xe9",label:"Confirm\xe9",color:"text-green-400"},{value:"exp\xe9di\xe9e",label:"Exp\xe9di\xe9e",color:"text-purple-400"},{value:"livr\xe9e",label:"Livr\xe9e",color:"text-emerald-400"},{value:"annul\xe9e",label:"Annul\xe9e",color:"text-red-400"}];(0,r.useEffect)(()=>{let e=localStorage.getItem("adminToken");if(!e){A.push("/admin/login");return}fetch("http://localhost:5000/api/auth/verify",{headers:{Authorization:"Bearer ".concat(e)}}).then(e=>e.json()).then(t=>{if(!["super_admin","admin","manager"].includes(t.data.user.role)){A.push("/admin/dashboard");return}N(e),T(e)}).catch(()=>{localStorage.removeItem("adminToken"),A.push("/admin/login")})},[x,f,g,A]);let T=async e=>{try{p(!0);let a=new URLSearchParams({page:g.toString(),limit:"10"});x&&a.append("search",x),f&&a.append("status",f);let r=e||w;console.log("Token utilis\xe9:",r),console.log("URL appel\xe9e:","http://localhost:5000/api/orders?".concat(a));let i=await fetch("http://localhost:5000/api/orders?".concat(a),{headers:{Authorization:"Bearer ".concat(r),"Content-Type":"application/json"}});if(console.log("R\xe9ponse status:",i.status),i.ok){var s;let e=await i.json();console.log("Commandes admin charg\xe9es:",e),t(e.data||[]),j((null===(s=e.pagination)||void 0===s?void 0:s.totalPages)||1)}else{let e=await i.json();console.error("Erreur API:",e)}}catch(e){console.error("Erreur lors du chargement des commandes:",e)}finally{p(!1)}},I=async(s,a)=>{try{let r=await fetch("http://localhost:5000/api/orders/".concat(s,"/status"),{method:"PATCH",headers:{Authorization:"Bearer ".concat(w),"Content-Type":"application/json"},body:JSON.stringify({status:a})});if(r.ok){let a=await r.json();a.data.deleted?(t(e.filter(e=>e._id!==s)),m.default.success(a.message)):(T(w),m.default.success("Statut mis \xe0 jour avec succ\xe8s"))}else{let e=await r.json();m.default.error(e.message||"Erreur lors de la mise \xe0 jour")}}catch(e){console.error("Erreur lors de la mise \xe0 jour du statut:",e),m.default.error("Erreur lors de la mise \xe0 jour du statut")}},Z=async s=>{if(confirm("\xcates-vous s\xfbr de vouloir supprimer cette commande ?"))try{let a=await fetch("http://localhost:5000/api/orders/".concat(s),{method:"DELETE",headers:{Authorization:"Bearer ".concat(w)}});if(a.ok)t(e.filter(e=>e._id!==s)),m.default.success("Commande supprim\xe9e avec succ\xe8s");else{let e=await a.json();m.default.error(e.message||"Erreur lors de la suppression")}}catch(e){console.error("Erreur lors de la suppression:",e),m.default.error("Erreur lors de la suppression")}},z=e=>{C(e),S(!0)},$=()=>{C(null),S(!1)},L=e=>{let t=D.find(t=>t.value===e);return(null==t?void 0:t.color)||"text-gray-400"},P=e=>new Intl.NumberFormat("fr-DZ",{style:"currency",currency:"DZD"}).format(e);return w?(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsx)("div",{className:"flex items-center space-x-3",children:(0,a.jsxs)(l.E.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>A.push("/admin/dashboard"),className:"flex items-center space-x-2 text-gray-300 hover:text-white transition-colors",children:[(0,a.jsx)(n.Z,{className:"w-5 h-5"}),(0,a.jsx)("span",{children:"Retour au Dashboard"})]})}),(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)(o.Z,{className:"w-8 h-8 text-white"}),(0,a.jsx)("h1",{className:"text-2xl font-bold text-white",children:"Gestion des Commandes"})]}),(0,a.jsx)("div",{})]}),(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[(0,a.jsxs)("div",{className:"relative flex-1",children:[(0,a.jsx)(c.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,a.jsx)("input",{type:"text",placeholder:"Rechercher une commande...",value:x,onChange:e=>h(e.target.value),className:"w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"})]}),(0,a.jsxs)("select",{value:f,onChange:e=>y(e.target.value),className:"px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent",children:[(0,a.jsx)("option",{value:"",children:"Tous les statuts"}),D.map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,a.jsxs)("button",{onClick:()=>T(),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2",children:[(0,a.jsx)(c.Z,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Actualiser"})]})]}),(0,a.jsx)("div",{className:"bg-gray-800 rounded-lg overflow-hidden",children:s?(0,a.jsx)("div",{className:"p-8 text-center text-gray-400",children:"Chargement des commandes..."}):(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full",children:[(0,a.jsx)("thead",{className:"bg-gray-700",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Commande"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Client"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Livraison"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Articles"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Montant"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Statut"}),(0,a.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Date"}),(0,a.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Actions"})]})}),(0,a.jsx)("tbody",{className:"divide-y divide-gray-700",children:e.map(e=>(0,a.jsxs)(l.E.tr,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"hover:bg-gray-700 transition-colors",children:[(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsxs)("div",{className:"text-sm font-medium text-white",children:["#",e.orderNumber]}),(0,a.jsxs)("div",{className:"text-xs text-gray-400",children:["ID: ",e._id.slice(-8)]})]}),(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsxs)("div",{className:"text-sm font-medium text-white",children:[e.customer.firstName," ",e.customer.lastName]}),(0,a.jsxs)("div",{className:"text-xs text-gray-400",children:["\uD83D\uDCDE ",e.customer.phone]})]}),(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"text-sm text-white",children:e.delivery.address}),(0,a.jsxs)("div",{className:"text-xs text-gray-400",children:[e.delivery.city,", ",e.delivery.wilaya," ",e.delivery.postalCode]})]}),(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsxs)("div",{className:"text-sm text-white",children:[e.items.length," article(s)"]}),(0,a.jsx)("div",{className:"text-xs text-gray-400",children:e.items.map(e=>{var t;return"".concat(e.quantity,"x ").concat((null===(t=e.product)||void 0===t?void 0:t.name)||"Produit supprim\xe9")}).join(", ")})]}),(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"text-sm font-medium text-white",children:P(e.total)}),(0,a.jsxs)("div",{className:"text-xs text-gray-400",children:["Sous-total: ",P(e.subtotal),(e.shippingCost||0)>0&&(0,a.jsxs)("span",{children:[" + Livraison: ",P(e.shippingCost||0)]})]})]}),(0,a.jsx)("td",{className:"px-4 py-4 whitespace-nowrap",children:(0,a.jsx)("select",{value:e.status,onChange:t=>I(e._id,t.target.value),className:"text-xs font-medium px-2 py-1 rounded-full border-0 bg-transparent ".concat(L(e.status)),children:D.map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))})}),(0,a.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"text-sm text-gray-400",children:new Date(e.createdAt).toLocaleDateString("fr-FR")}),(0,a.jsx)("div",{className:"text-xs text-gray-500",children:new Date(e.createdAt).toLocaleTimeString("fr-FR")})]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,a.jsxs)("div",{className:"flex items-center justify-end space-x-2",children:[(0,a.jsx)(l.E.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>z(e),className:"text-blue-400 hover:text-blue-300",title:"Voir les d\xe9tails",children:(0,a.jsx)(d.Z,{className:"w-4 h-4"})}),(0,a.jsx)(l.E.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>Z(e._id),className:"text-red-400 hover:text-red-300",title:"Supprimer la commande",children:(0,a.jsx)(u.Z,{className:"w-4 h-4"})})]})})]},e._id))})]})})}),b>1&&(0,a.jsxs)("div",{className:"flex items-center justify-center space-x-2 mt-6",children:[(0,a.jsx)("button",{onClick:()=>v(e=>Math.max(e-1,1)),disabled:1===g,className:"px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600",children:"Pr\xe9c\xe9dent"}),(0,a.jsxs)("span",{className:"px-4 py-2 text-white",children:["Page ",g," sur ",b]}),(0,a.jsx)("button",{onClick:()=>v(e=>Math.min(e+1,b)),disabled:g===b,className:"px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600",children:"Suivant"})]}),E&&k&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,a.jsx)(l.E.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},className:"bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto",children:(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsxs)("h2",{className:"text-2xl font-bold text-white",children:["D\xe9tails de la commande #",k.orderNumber]}),(0,a.jsx)("button",{onClick:$,className:"text-gray-400 hover:text-white text-2xl",children:"\xd7"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",children:[(0,a.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Informations Client"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Nom:"})," ",k.customer.firstName," ",k.customer.lastName]}),(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"T\xe9l\xe9phone:"})," ",k.customer.phone]})]})]}),(0,a.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Adresse de Livraison"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Adresse:"})," ",k.delivery.address]}),(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Ville:"})," ",k.delivery.city]}),(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Wilaya:"})," ",k.delivery.wilaya]}),(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Code postal:"})," ",k.delivery.postalCode]}),k.delivery.notes&&(0,a.jsxs)("p",{className:"text-gray-300",children:[(0,a.jsx)("span",{className:"font-medium text-white",children:"Notes:"})," ",k.delivery.notes]})]})]})]}),(0,a.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg mb-6",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Articles Command\xe9s"}),(0,a.jsx)("div",{className:"space-y-3",children:k.items.map((e,t)=>{var s;return(0,a.jsxs)("div",{className:"flex items-center justify-between bg-gray-600 p-3 rounded",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-white font-medium",children:(null===(s=e.product)||void 0===s?void 0:s.name)||"Produit supprim\xe9"}),(0,a.jsxs)("p",{className:"text-gray-400 text-sm",children:["Taille: ",e.selectedSize," | Couleur: ",e.selectedColor]})]}),(0,a.jsxs)("div",{className:"text-right",children:[(0,a.jsxs)("p",{className:"text-white",children:["Quantit\xe9: ",e.quantity]}),(0,a.jsxs)("p",{className:"text-gray-400",children:[P(e.product.price)," \xd7 ",e.quantity]})]})]},t)})})]}),(0,a.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"R\xe9sum\xe9 Financier"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-gray-300",children:"Sous-total:"}),(0,a.jsx)("span",{className:"text-white",children:P(k.subtotal)})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-gray-300",children:"Livraison:"}),(0,a.jsx)("span",{className:"text-white",children:k.shippingCost&&k.shippingCost>0?P(k.shippingCost):"Gratuite"})]}),(0,a.jsxs)("div",{className:"flex justify-between text-lg font-semibold border-t border-gray-600 pt-2",children:[(0,a.jsx)("span",{className:"text-white",children:"Total:"}),(0,a.jsx)("span",{className:"text-white",children:P(k.total)})]})]})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3 mt-6",children:[(0,a.jsx)("button",{onClick:$,className:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500",children:"Fermer"}),(0,a.jsx)("select",{value:k.status,onChange:e=>{I(k._id,e.target.value),C({...k,status:e.target.value})},className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:D.map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})})})]}):null}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.r(t),s.d(t,{CheckmarkIcon:function(){return Y},ErrorIcon:function(){return U},LoaderIcon:function(){return J},ToastBar:function(){return eo},ToastIcon:function(){return es},Toaster:function(){return em},default:function(){return ep},resolveValue:function(){return k},toast:function(){return R},useToaster:function(){return F},useToasterStore:function(){return O}});var i,l=s(2265);let n={data:""},o=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":a+="f"==i[1]?m(l,i):i+"{"+m(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=m(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,l):i+":"+l+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let l=x(e),n=p[l]||(p[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!p[n]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let o=s&&p.g?p.g:null;return s&&(p.g=p[n]),i=p[n],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},f=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function y(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}y.bind({g:1});let g,v,b,j=y.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function r(i,l){let n=Object.assign({},i),o=n.className||r.className;s.p=Object.assign({theme:v&&v()},n),s.o=/ *go\d+/.test(o),n.className=y.apply(s,a)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),b&&c[0]&&b(n),g(c,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,C=(a=0,()=>(++a).toString()),E=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},Z=(e,t=S)=>{I[t]=A(I[t]||T,e),D.forEach(([e,s])=>{e===t&&s(I[t])})},z=e=>Object.keys(I).forEach(t=>Z(e,t)),$=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),L=(e=S)=>t=>{Z(t,e)},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=S)=>{let[s,a]=(0,l.useState)(I[t]||T),r=(0,l.useRef)(I[t]);(0,l.useEffect)(()=>(r.current!==I[t]&&a(I[t]),D.push([t,a]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},_=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),M=e=>(t,s)=>{let a=_(t,e,s);return L(a.toasterId||$(a.id))({type:2,toast:a}),a.id},R=(e,t)=>M("blank")(e,t);R.error=M("error"),R.success=M("success"),R.loading=M("loading"),R.custom=M("custom"),R.dismiss=(e,t)=>{let s={type:3,toastId:e};t?L(t)(s):z(s)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let s={type:4,toastId:e};t?L(t)(s):z(s)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,s)=>{let a=R.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?R.success(r,{id:a,...s,...null==s?void 0:s.success}):R.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?R.error(r,{id:a,...s,...null==s?void 0:s.error}):R.dismiss(a)}),e};var H=1e3,F=(e,t="default")=>{let{toasts:s,pausedAt:a}=O(e,t),r=(0,l.useRef)(new Map).current,i=(0,l.useCallback)((e,t=H)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&R.dismiss(s.id);return}return setTimeout(()=>R.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,l.useCallback)(L(t),[t]),o=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,l.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:u}}},q=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
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
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,Q=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=j`
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
}`,Y=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
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
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(J,{...a}),"loading"!==s&&l.createElement(K,null,"error"===s?l.createElement(U,{...a}):l.createElement(Y,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,el=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=l.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(es,{toast:e}),n=l.createElement(el,{...e.ariaProps},k(e.message,e));return l.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:n}):l.createElement(l.Fragment,null,i,n))});i=l.createElement,m.p=void 0,g=i,v=void 0,b=void 0;var ec=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:i,className:t,style:s},r)},ed=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:n,containerClassName:o})=>{let{toasts:c,handlers:d}=F(s,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let i=s.position||t,n=ed(i,d.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ec,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?eu:"",style:n},"custom"===s.type?k(s.message,s):r?r(s):l.createElement(eo,{toast:s,position:i}))}))},ep=R}},function(e){e.O(0,[581,971,938,744],function(){return e(e.s=3578)}),_N_E=e.O()}]);