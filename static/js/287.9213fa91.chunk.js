"use strict";(self.webpackChunkbaemin_fe=self.webpackChunkbaemin_fe||[]).push([[287],{9084:function(e,n,t){t.d(n,{Z:function(){return s}});var a=t(2791),r=t(7689),i=t(184),o=function(e){var n=e.title,t=e.onGoBack,a=(0,r.s0)();return(0,i.jsxs)("div",{className:"header flex items-center h-8 border-b-[0.5px] relative p-5 border-b-primary-gray bg-primary-light",children:[(0,i.jsx)("button",{type:"button",className:"",onClick:function(){a(-1),"function"===typeof t&&t()},children:(0,i.jsx)("i",{className:"fa-solid fa-arrow-left text-lg"})}),(0,i.jsx)("div",{className:"absolute left-[50%] translate-x-[-50%]",children:n})]})};o.defaultProps={onGoBack:void 0};var s=a.memo(o)},208:function(e,n,t){t.d(n,{q:function(){return l}});var a=t(1413),r=t(885),i=t(1113),o={isLoggedIn:!1,userInfo:{id:"-1",username:"",password:"",role:"guest",name:""}},s=(0,i.D)((function(e,n){return(0,a.Z)((0,a.Z)({},o),{},{actionLoggedIn:function(n){return e({userInfo:n,isLoggedIn:!0})},actionLogout:function(){return e((0,a.Z)({},o))}})}),"useAuthenStore"),l=(0,r.Z)(s,1)[0]},6885:function(e,n,t){t.d(n,{q:function(){return a.q}});var a=t(208)},2287:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var a=t(9084),r=t(6885),i=t(2791),o=t(1020),s=t(7689),l=t(885),c=t(184),u=function(e){var n,t=e.items,a=e.defaultItemKey,r=void 0===a?"":a,o=e.type,s=e.className,u=i.useState(r||(null===(n=t[0])||void 0===n?void 0:n.key)||""),m=(0,l.Z)(u,2),d=m[0],f=m[1];return(0,c.jsx)("div",{className:"menu-container bg-primary-light  flex ".concat("vertical"===o?"flex-col":"flex-row"," ").concat(s&&s),children:t.map((function(e){var n=e.key,t=e.label,a=e.onClickMenuItem,r=e.icon,i=d===n;return(0,c.jsxs)("div",{className:"menu-item grid items-center gap-3 px-5 border-b-[0.5px] ".concat(i&&"menu-item-selected"),style:{gridTemplateColumns:"min-content 1fr"},children:[r||(0,c.jsx)("i",{className:"fa-regular fa-address-book"}),(0,c.jsx)("span",{onClick:function(){f(e.key),"function"===typeof a&&a(e)},className:"menu-item-label cursor-pointer h-10 leading-10 truncate",children:t})]},n)}))})},m=i.memo(u),d=i.memo((function(){var e=(0,s.s0)();return(0,c.jsx)("div",{className:"extra grid grid-cols-3 h-16 bg-primary-light border-y-[0.5px]",children:[{title:"My Orders",icon:(0,c.jsx)("i",{className:"fa-regular fa-address-book"}),onClickItem:function(){return e("/manage-orders")}},{title:"Favorites Stores",icon:(0,c.jsx)("i",{className:"fa-regular fa-address-book"})},{title:"Saved Places",icon:(0,c.jsx)("i",{className:"fa-regular fa-address-book"})}].map((function(e){var n=e.title,t=e.icon,a=e.onClickItem;return(0,c.jsxs)("div",{className:"w-[100%] h-[100%] flex items-center justify-center flex-col gap-1 border-r-[0.5px] hover:font-medium",children:[t,(0,c.jsx)("div",{className:"cursor-pointer hover:font-medium",onClick:function(){return"function"===typeof a&&a()},children:n})]},n)}))})})),f=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d,{}),(0,c.jsx)(m,{className:"mt-5",items:[{key:"coupon-box",label:"Coupon box"},{key:"payment-management",label:"Payment Management"},{key:"information-sharing",label:"Information Sharing"}],type:"vertical"}),(0,c.jsx)(m,{className:"mt-5",items:[{key:"rate-baemin",label:"Rate Baemin"},{key:"notification",label:"Notification"},{key:"help-sharing",label:"Help Sharing"},{key:"terms-and-condition",label:"Terms and Conditions"}],type:"vertical"})]})},g=i.memo(f),x=function(){return(0,c.jsx)("div",{children:"setting page"})},p=i.memo(x),b=function(){var e=(0,r.q)().userInfo.role,n=(0,r.q)().actionLogout,t=(0,s.s0)(),l=i.useCallback((function(){n(),t("/login")}),[]),u=i.useMemo((function(){switch(e){case"customer":return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{}),(0,c.jsx)(o.Z,{title:"Logout",onClick:l,className:"w-[100%] mt-5"})]});case"admin":return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(p,{}),(0,c.jsx)(o.Z,{title:"Logout",onClick:l,className:"w-[100%] mt-5"})]});default:return null}}),[e]);return(0,c.jsxs)("div",{className:"bg-primary-light-gray",children:[(0,c.jsx)(a.Z,{title:"My Page"}),u]})},h=i.memo(b)}}]);
//# sourceMappingURL=287.9213fa91.chunk.js.map