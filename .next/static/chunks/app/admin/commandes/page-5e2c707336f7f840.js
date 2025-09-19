(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[101],{3067:function(e,r,n){"use strict";n.d(r,{Z:function(){return d}});var c=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},9670:function(e,r,n){"use strict";n.d(r,{Z:function(){return d}});var c=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},4322:function(e,r,n){"use strict";n.d(r,{Z:function(){return d}});var c=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},1827:function(e,r,n){"use strict";n.d(r,{Z:function(){return d}});var c=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},5367:function(e,r,n){"use strict";n.d(r,{Z:function(){return d}});var c=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},3578:function(e,r,n){Promise.resolve().then(n.bind(n,3316))},3316:function(e,r,n){"use strict";n.r(r);var c=n(7437),d=n(2265),m=n(4033),x=n(5251),h=n(3067),f=n(4322),y=n(1827),g=n(9670),v=n(5367),b=n(5925);r.default=()=>{let[e,r]=(0,d.useState)([]),[n,N]=(0,d.useState)(!0),[k,C]=(0,d.useState)(""),[D,A]=(0,d.useState)(""),[T,O]=(0,d.useState)(1),[M,I]=(0,d.useState)(1),[z,L]=(0,d.useState)(null),[R,F]=(0,d.useState)(null),[q,B]=(0,d.useState)(!1),U=(0,m.useRouter)(),G=[{value:"en attente",label:"En attente",color:"text-yellow-400"},{value:"confirm\xe9",label:"Confirm\xe9",color:"text-green-400"},{value:"exp\xe9di\xe9e",label:"Exp\xe9di\xe9e",color:"text-purple-400"},{value:"livr\xe9e",label:"Livr\xe9e",color:"text-emerald-400"},{value:"annul\xe9e",label:"Annul\xe9e",color:"text-red-400"}];(0,d.useEffect)(()=>{let e=localStorage.getItem("adminToken");if(!e){U.push("/admin/login");return}fetch("http://localhost:5000/api/auth/verify",{headers:{Authorization:"Bearer ".concat(e)}}).then(e=>e.json()).then(r=>{if(!["super_admin","admin","manager"].includes(r.data.user.role)){U.push("/admin/dashboard");return}L(e),fetchOrders(e)}).catch(()=>{localStorage.removeItem("adminToken"),U.push("/admin/login")})},[k,D,T,U]);let fetchOrders=async e=>{try{N(!0);let c=new URLSearchParams({page:T.toString(),limit:"10"});k&&c.append("search",k),D&&c.append("status",D);let d=e||z;console.log("Token utilis\xe9:",d),console.log("URL appel\xe9e:","http://localhost:5000/api/orders?".concat(c));let m=await fetch("http://localhost:5000/api/orders?".concat(c),{headers:{Authorization:"Bearer ".concat(d),"Content-Type":"application/json"}});if(console.log("R\xe9ponse status:",m.status),m.ok){var n;let e=await m.json();console.log("Commandes admin charg\xe9es:",e),r(e.data||[]),I((null===(n=e.pagination)||void 0===n?void 0:n.totalPages)||1)}else{let e=await m.json();console.error("Erreur API:",e)}}catch(e){console.error("Erreur lors du chargement des commandes:",e)}finally{N(!1)}},updateOrderStatus=async(n,c)=>{try{let d=await fetch("http://localhost:5000/api/orders/".concat(n,"/status"),{method:"PATCH",headers:{Authorization:"Bearer ".concat(z),"Content-Type":"application/json"},body:JSON.stringify({status:c})});if(d.ok){let c=await d.json();c.data.deleted?(r(e.filter(e=>e._id!==n)),b.default.success(c.message)):(fetchOrders(z),b.default.success("Statut mis \xe0 jour avec succ\xe8s"))}else{let e=await d.json();b.default.error(e.message||"Erreur lors de la mise \xe0 jour")}}catch(e){console.error("Erreur lors de la mise \xe0 jour du statut:",e),b.default.error("Erreur lors de la mise \xe0 jour du statut")}},deleteOrder=async n=>{if(confirm("\xcates-vous s\xfbr de vouloir supprimer cette commande ?"))try{let c=await fetch("http://localhost:5000/api/orders/".concat(n),{method:"DELETE",headers:{Authorization:"Bearer ".concat(z)}});if(c.ok)r(e.filter(e=>e._id!==n)),b.default.success("Commande supprim\xe9e avec succ\xe8s");else{let e=await c.json();b.default.error(e.message||"Erreur lors de la suppression")}}catch(e){console.error("Erreur lors de la suppression:",e),b.default.error("Erreur lors de la suppression")}},openDetailsModal=e=>{F(e),B(!0)},closeDetailsModal=()=>{F(null),B(!1)},getStatusColor=e=>{let r=G.find(r=>r.value===e);return(null==r?void 0:r.color)||"text-gray-400"},formatPrice=e=>new Intl.NumberFormat("fr-DZ",{style:"currency",currency:"DZD"}).format(e);return z?(0,c.jsxs)("div",{className:"p-6",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,c.jsx)("div",{className:"flex items-center space-x-3",children:(0,c.jsxs)(x.E.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>U.push("/admin/dashboard"),className:"flex items-center space-x-2 text-gray-300 hover:text-white transition-colors",children:[(0,c.jsx)(h.Z,{className:"w-5 h-5"}),(0,c.jsx)("span",{children:"Retour au Dashboard"})]})}),(0,c.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,c.jsx)(f.Z,{className:"w-8 h-8 text-white"}),(0,c.jsx)("h1",{className:"text-2xl font-bold text-white",children:"Gestion des Commandes"})]}),(0,c.jsx)("div",{})]}),(0,c.jsxs)("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[(0,c.jsxs)("div",{className:"relative flex-1",children:[(0,c.jsx)(y.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,c.jsx)("input",{type:"text",placeholder:"Rechercher une commande...",value:k,onChange:e=>C(e.target.value),className:"w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"})]}),(0,c.jsxs)("select",{value:D,onChange:e=>A(e.target.value),className:"px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent",children:[(0,c.jsx)("option",{value:"",children:"Tous les statuts"}),G.map(e=>(0,c.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,c.jsxs)("button",{onClick:()=>fetchOrders(),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2",children:[(0,c.jsx)(y.Z,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"Actualiser"})]})]}),(0,c.jsx)("div",{className:"bg-gray-800 rounded-lg overflow-hidden",children:n?(0,c.jsx)("div",{className:"p-8 text-center text-gray-400",children:"Chargement des commandes..."}):(0,c.jsx)("div",{className:"overflow-x-auto",children:(0,c.jsxs)("table",{className:"w-full",children:[(0,c.jsx)("thead",{className:"bg-gray-700",children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Commande"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Client"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Livraison"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Articles"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Montant"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Statut"}),(0,c.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Date"}),(0,c.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider",children:"Actions"})]})}),(0,c.jsx)("tbody",{className:"divide-y divide-gray-700",children:e.map(e=>(0,c.jsxs)(x.E.tr,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"hover:bg-gray-700 transition-colors",children:[(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsxs)("div",{className:"text-sm font-medium text-white",children:["#",e.orderNumber]}),(0,c.jsxs)("div",{className:"text-xs text-gray-400",children:["ID: ",e._id.slice(-8)]})]}),(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsxs)("div",{className:"text-sm font-medium text-white",children:[e.customer.firstName," ",e.customer.lastName]}),(0,c.jsxs)("div",{className:"text-xs text-gray-400",children:["\uD83D\uDCDE ",e.customer.phone]})]}),(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsx)("div",{className:"text-sm text-white",children:e.delivery.address}),(0,c.jsxs)("div",{className:"text-xs text-gray-400",children:[e.delivery.city,", ",e.delivery.wilaya," ",e.delivery.postalCode]})]}),(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsxs)("div",{className:"text-sm text-white",children:[e.items.length," article(s)"]}),(0,c.jsx)("div",{className:"text-xs text-gray-400",children:e.items.map(e=>{var r;return"".concat(e.quantity,"x ").concat((null===(r=e.product)||void 0===r?void 0:r.name)||"Produit supprim\xe9")}).join(", ")})]}),(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsx)("div",{className:"text-sm font-medium text-white",children:formatPrice(e.total)}),(0,c.jsxs)("div",{className:"text-xs text-gray-400",children:["Sous-total: ",formatPrice(e.subtotal),(e.shippingCost||0)>0&&(0,c.jsxs)("span",{children:[" + Livraison: ",formatPrice(e.shippingCost||0)]})]})]}),(0,c.jsx)("td",{className:"px-4 py-4 whitespace-nowrap",children:(0,c.jsx)("select",{value:e.status,onChange:r=>updateOrderStatus(e._id,r.target.value),className:"text-xs font-medium px-2 py-1 rounded-full border-0 bg-transparent ".concat(getStatusColor(e.status)),children:G.map(e=>(0,c.jsx)("option",{value:e.value,children:e.label},e.value))})}),(0,c.jsxs)("td",{className:"px-4 py-4 whitespace-nowrap",children:[(0,c.jsx)("div",{className:"text-sm text-gray-400",children:new Date(e.createdAt).toLocaleDateString("fr-FR")}),(0,c.jsx)("div",{className:"text-xs text-gray-500",children:new Date(e.createdAt).toLocaleTimeString("fr-FR")})]}),(0,c.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,c.jsxs)("div",{className:"flex items-center justify-end space-x-2",children:[(0,c.jsx)(x.E.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>openDetailsModal(e),className:"text-blue-400 hover:text-blue-300",title:"Voir les d\xe9tails",children:(0,c.jsx)(g.Z,{className:"w-4 h-4"})}),(0,c.jsx)(x.E.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>deleteOrder(e._id),className:"text-red-400 hover:text-red-300",title:"Supprimer la commande",children:(0,c.jsx)(v.Z,{className:"w-4 h-4"})})]})})]},e._id))})]})})}),M>1&&(0,c.jsxs)("div",{className:"flex items-center justify-center space-x-2 mt-6",children:[(0,c.jsx)("button",{onClick:()=>O(e=>Math.max(e-1,1)),disabled:1===T,className:"px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600",children:"Pr\xe9c\xe9dent"}),(0,c.jsxs)("span",{className:"px-4 py-2 text-white",children:["Page ",T," sur ",M]}),(0,c.jsx)("button",{onClick:()=>O(e=>Math.min(e+1,M)),disabled:T===M,className:"px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600",children:"Suivant"})]}),q&&R&&(0,c.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,c.jsx)(x.E.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},className:"bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto",children:(0,c.jsxs)("div",{className:"p-6",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,c.jsxs)("h2",{className:"text-2xl font-bold text-white",children:["D\xe9tails de la commande #",R.orderNumber]}),(0,c.jsx)("button",{onClick:closeDetailsModal,className:"text-gray-400 hover:text-white text-2xl",children:"\xd7"})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",children:[(0,c.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,c.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Informations Client"}),(0,c.jsxs)("div",{className:"space-y-2",children:[(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Nom:"})," ",R.customer.firstName," ",R.customer.lastName]}),(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"T\xe9l\xe9phone:"})," ",R.customer.phone]})]})]}),(0,c.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,c.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Adresse de Livraison"}),(0,c.jsxs)("div",{className:"space-y-2",children:[(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Adresse:"})," ",R.delivery.address]}),(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Ville:"})," ",R.delivery.city]}),(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Wilaya:"})," ",R.delivery.wilaya]}),(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Code postal:"})," ",R.delivery.postalCode]}),R.delivery.notes&&(0,c.jsxs)("p",{className:"text-gray-300",children:[(0,c.jsx)("span",{className:"font-medium text-white",children:"Notes:"})," ",R.delivery.notes]})]})]})]}),(0,c.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg mb-6",children:[(0,c.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"Articles Command\xe9s"}),(0,c.jsx)("div",{className:"space-y-3",children:R.items.map((e,r)=>{var n;return(0,c.jsxs)("div",{className:"flex items-center justify-between bg-gray-600 p-3 rounded",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("p",{className:"text-white font-medium",children:(null===(n=e.product)||void 0===n?void 0:n.name)||"Produit supprim\xe9"}),(0,c.jsxs)("p",{className:"text-gray-400 text-sm",children:["Taille: ",e.selectedSize," | Couleur: ",e.selectedColor]})]}),(0,c.jsxs)("div",{className:"text-right",children:[(0,c.jsxs)("p",{className:"text-white",children:["Quantit\xe9: ",e.quantity]}),(0,c.jsxs)("p",{className:"text-gray-400",children:[formatPrice(e.product.price)," \xd7 ",e.quantity]})]})]},r)})})]}),(0,c.jsxs)("div",{className:"bg-gray-700 p-4 rounded-lg",children:[(0,c.jsx)("h3",{className:"text-lg font-semibold text-white mb-3",children:"R\xe9sum\xe9 Financier"}),(0,c.jsxs)("div",{className:"space-y-2",children:[(0,c.jsxs)("div",{className:"flex justify-between",children:[(0,c.jsx)("span",{className:"text-gray-300",children:"Sous-total:"}),(0,c.jsx)("span",{className:"text-white",children:formatPrice(R.subtotal)})]}),(0,c.jsxs)("div",{className:"flex justify-between",children:[(0,c.jsx)("span",{className:"text-gray-300",children:"Livraison:"}),(0,c.jsx)("span",{className:"text-white",children:R.shippingCost&&R.shippingCost>0?formatPrice(R.shippingCost):"Gratuite"})]}),(0,c.jsxs)("div",{className:"flex justify-between text-lg font-semibold border-t border-gray-600 pt-2",children:[(0,c.jsx)("span",{className:"text-white",children:"Total:"}),(0,c.jsx)("span",{className:"text-white",children:formatPrice(R.total)})]})]})]}),(0,c.jsxs)("div",{className:"flex justify-end space-x-3 mt-6",children:[(0,c.jsx)("button",{onClick:closeDetailsModal,className:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500",children:"Fermer"}),(0,c.jsx)("select",{value:R.status,onChange:e=>{updateOrderStatus(R._id,e.target.value),F({...R,status:e.target.value})},className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:G.map(e=>(0,c.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})})})]}):null}},4033:function(e,r,n){e.exports=n(94)},5925:function(e,r,n){"use strict";let c,d;n.r(r),n.d(r,{CheckmarkIcon:function(){return W},ErrorIcon:function(){return q},LoaderIcon:function(){return U},ToastBar:function(){return er},ToastIcon:function(){return $},Toaster:function(){return Fe},default:function(){return el},resolveValue:function(){return dist_h},toast:function(){return dist_n},useToaster:function(){return w},useToasterStore:function(){return V}});var m,x=n(2265);let h={data:""},t=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||h,f=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,g=/\n+/g,o=(e,r)=>{let n="",c="",d="";for(let m in e){let x=e[m];"@"==m[0]?"i"==m[1]?n=m+" "+x+";":c+="f"==m[1]?o(x,m):m+"{"+o(x,"k"==m[1]?"":r)+"}":"object"==typeof x?c+=o(x,r?r.replace(/([^,])+/g,e=>m.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):m):null!=x&&(m=/^--/.test(m)?m:m.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(m,x):m+":"+x+";")}return n+(r&&d?r+"{"+d+"}":d)+c},v={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,c,d)=>{var m;let x=s(e),h=v[x]||(v[x]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(x));if(!v[h]){let r=x!==e?e:(e=>{let r,n,c=[{}];for(;r=f.exec(e.replace(y,""));)r[4]?c.shift():r[3]?(n=r[3].replace(g," ").trim(),c.unshift(c[0][n]=c[0][n]||{})):c[0][r[1]]=r[2].replace(g," ").trim();return c[0]})(e);v[h]=o(d?{["@keyframes "+h]:r}:r,n?"":"."+h)}let b=n&&v.g?v.g:null;return n&&(v.g=v[h]),m=v[h],b?r.data=r.data.replace(b,m):-1===r.data.indexOf(m)&&(r.data=c?m+r.data:r.data+m),h},p=(e,r,n)=>e.reduce((e,c,d)=>{let m=r[d];if(m&&m.call){let e=m(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;m=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+c+(null==m?"":m)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let b,N,k,C=u.bind({k:1});function j(e,r){let n=this||{};return function(){let c=arguments;function a(d,m){let x=Object.assign({},d),h=x.className||a.className;n.p=Object.assign({theme:N&&N()},x),n.o=/ *go\d+/.test(h),x.className=u.apply(n,c)+(h?" "+h:""),r&&(x.ref=m);let f=e;return e[0]&&(f=x.as||e,delete x.as),k&&f[0]&&k(x),b(f,x)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,D=(c=0,()=>(++c).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},A="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:c}=r;return H(e,{type:e.toasts.find(e=>e.id===c.id)?1:0,toast:c});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let m=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+m}))}}},T=[],O={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},M={},Y=(e,r=A)=>{M[r]=H(M[r]||O,e),T.forEach(([e,n])=>{e===r&&n(M[r])})},_=e=>Object.keys(M).forEach(r=>Y(e,r)),Q=e=>Object.keys(M).find(r=>M[r].toasts.some(r=>r.id===e)),S=(e=A)=>r=>{Y(r,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=A)=>{let[n,c]=(0,x.useState)(M[r]||O),d=(0,x.useRef)(M[r]);(0,x.useEffect)(()=>(d.current!==M[r]&&c(M[r]),T.push([r,c]),()=>{let e=T.findIndex(([e])=>e===r);e>-1&&T.splice(e,1)}),[r]);let m=n.toasts.map(r=>{var n,c,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(n=e[r.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(c=e[r.type])?void 0:c.duration)||(null==e?void 0:e.duration)||I[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...n,toasts:m}},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||D()}),P=e=>(r,n)=>{let c=ie(r,e,n);return S(c.toasterId||Q(c.id))({type:2,toast:c}),c.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let c=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:c,...n,...null==n?void 0:n.success}):dist_n.dismiss(c),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:c,...n,...null==n?void 0:n.error}):dist_n.dismiss(c)}),e};var z=1e3,w=(e,r="default")=>{let{toasts:n,pausedAt:c}=V(e,r),d=(0,x.useRef)(new Map).current,m=(0,x.useCallback)((e,r=z)=>{if(d.has(e))return;let n=setTimeout(()=>{d.delete(e),h({type:4,toastId:e})},r);d.set(e,n)},[]);(0,x.useEffect)(()=>{if(c)return;let e=Date.now(),d=n.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(c<0){n.visible&&dist_n.dismiss(n.id);return}return setTimeout(()=>dist_n.dismiss(n.id,r),c)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[n,c,r]);let h=(0,x.useCallback)(S(r),[r]),f=(0,x.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),y=(0,x.useCallback)((e,r)=>{h({type:1,toast:{id:e,height:r}})},[h]),g=(0,x.useCallback)(()=>{c&&h({type:6,time:Date.now()})},[c,h]),v=(0,x.useCallback)((e,r)=>{let{reverseOrder:c=!1,gutter:d=8,defaultPosition:m}=r||{},x=n.filter(r=>(r.position||m)===(e.position||m)&&r.height),h=x.findIndex(r=>r.id===e.id),f=x.filter((e,r)=>r<h&&e.visible).length;return x.filter(e=>e.visible).slice(...c?[f+1]:[0,f]).reduce((e,r)=>e+(r.height||0)+d,0)},[n]);return(0,x.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)m(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[n,m]),{toasts:n,handlers:{updateHeight:y,startPause:f,endPause:g,calculateOffset:v}}},L=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=j("div")`
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
    animation: ${R} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,G=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=C`
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
}`,W=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
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
`,X=j("div")`
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
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:c}=e;return void 0!==r?"string"==typeof r?x.createElement(et,null,r):r:"blank"===n?null:x.createElement(X,null,x.createElement(U,{...c}),"loading"!==n&&x.createElement(K,null,"error"===n?x.createElement(q,{...c}):x.createElement(W,{...c})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=j("div")`
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
`,ea=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[c,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${C(c)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=x.memo(({toast:e,position:r,style:n,children:c})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},m=x.createElement($,{toast:e}),h=x.createElement(ea,{...e.ariaProps},dist_h(e.message,e));return x.createElement(es,{className:e.className,style:{...d,...n,...e.style}},"function"==typeof c?c({icon:m,message:h}):x.createElement(x.Fragment,null,m,h))});m=x.createElement,o.p=void 0,b=m,N=void 0,k=void 0;var we=({id:e,className:r,style:n,onHeightUpdate:c,children:d})=>{let m=x.useCallback(r=>{if(r){let l=()=>{c(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,c]);return x.createElement("div",{ref:m,className:r,style:n},d)},Me=(e,r)=>{let n=e.includes("top"),c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...c}},ei=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:c,children:d,toasterId:m,containerStyle:h,containerClassName:f})=>{let{toasts:y,handlers:g}=w(n,m);return x.createElement("div",{"data-rht-toaster":m||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...h},className:f,onMouseEnter:g.startPause,onMouseLeave:g.endPause},y.map(n=>{let m=n.position||r,h=Me(m,g.calculateOffset(n,{reverseOrder:e,gutter:c,defaultPosition:r}));return x.createElement(we,{id:n.id,key:n.id,onHeightUpdate:g.updateHeight,className:n.visible?ei:"",style:h},"custom"===n.type?dist_h(n.message,n):d?d(n):x.createElement(er,{toast:n,position:m}))}))},el=dist_n}},function(e){e.O(0,[581,971,472,744],function(){return e(e.s=3578)}),_N_E=e.O()}]);