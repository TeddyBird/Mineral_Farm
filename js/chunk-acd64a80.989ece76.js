(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-acd64a80"],{"114d":function(t,e,n){},"66ee":function(t,e,n){"use strict";n.r(e);n("b0c0");var c=n("7a23"),a={class:"pay"},s=Object(c["g"])("ol",{class:"cart-progress"},[Object(c["g"])("li",null,[Object(c["g"])("span",null,"step 1"),Object(c["i"])("確認清單")]),Object(c["g"])("li",null,[Object(c["g"])("span",null,"step 2"),Object(c["i"])("填寫資料")]),Object(c["g"])("li",{class:"cur-step"},[Object(c["g"])("span",null,"step 3"),Object(c["i"])("確認付款")]),Object(c["g"])("li",null,[Object(c["g"])("span",null,"step 4"),Object(c["i"])("完成訂單")])],-1),l={class:"container"},r={class:"order-list"},i=Object(c["g"])("thead",null,[Object(c["g"])("tr",null,[Object(c["g"])("th",null,"品名"),Object(c["g"])("th",null,"數量"),Object(c["g"])("th",null,"小計")])],-1),o=["src","alt"],u=Object(c["g"])("td",null,null,-1),d=Object(c["g"])("td",null,"總計",-1),b={class:"customer-info"},O=Object(c["g"])("thead",null,[Object(c["g"])("tr",null,[Object(c["g"])("th",{colspan:"2"},"收件人資訊")])],-1),g=Object(c["g"])("td",null,"姓名",-1),p=Object(c["g"])("td",null,"信箱",-1),j=Object(c["g"])("td",null,"電話",-1),f=Object(c["g"])("td",null,"地址",-1);function h(t,e,n,h,y,v){var m=Object(c["F"])("Loading");return Object(c["z"])(),Object(c["f"])("div",a,[y.isLoading?(Object(c["z"])(),Object(c["d"])(m,{key:0})):Object(c["e"])("",!0),s,Object(c["g"])("div",l,[Object(c["g"])("table",r,[i,Object(c["g"])("tbody",null,[(Object(c["z"])(!0),Object(c["f"])(c["a"],null,Object(c["E"])(y.orderInfo.products,(function(t){return Object(c["z"])(),Object(c["f"])("tr",{key:t.id},[Object(c["g"])("td",null,[Object(c["g"])("img",{src:t.product.imageUrl,alt:t.product.title},null,8,o),Object(c["g"])("span",null,Object(c["I"])(t.product.title),1)]),Object(c["g"])("td",null,Object(c["I"])(t.qty)+" "+Object(c["I"])(t.product.unit),1),Object(c["g"])("td",null,Object(c["I"])(t.final_total)+" G",1)])})),128)),Object(c["g"])("tr",null,[u,d,Object(c["g"])("td",null,Object(c["I"])(y.orderInfo.total)+" G",1)])])]),Object(c["g"])("table",b,[O,Object(c["g"])("tbody",null,[Object(c["g"])("tr",null,[g,Object(c["g"])("td",null,Object(c["I"])(y.user.name),1)]),Object(c["g"])("tr",null,[p,Object(c["g"])("td",null,Object(c["I"])(y.user.email),1)]),Object(c["g"])("tr",null,[j,Object(c["g"])("td",null,Object(c["I"])(y.user.tel),1)]),Object(c["g"])("tr",null,[f,Object(c["g"])("td",null,Object(c["I"])(y.user.address),1)])])]),Object(c["g"])("button",{type:"button",class:"pay-btn",onClick:e[0]||(e[0]=function(){return v.payOrder&&v.payOrder.apply(v,arguments)})},"確認付款")])])}n("99af");var y=n("c2a1"),v={data:function(){return{isLoading:!1,orderInfo:"",user:""}},components:{Loading:y["a"]},inject:["emitter"],methods:{getOrder:function(){var t=this,e=JSON.parse(localStorage.getItem("orderId"));this.isLoading=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/","v2/api/").concat("tedbirdy","/order/").concat(e)).then((function(e){t.isLoading=!1,t.orderInfo=e.data.order,t.user=e.data.order.user}))},payOrder:function(){var t=this,e=this.orderInfo.id;this.isLoading=!0,this.$http.post("".concat("https://vue3-course-api.hexschool.io/","v2/api/").concat("tedbirdy","/pay/").concat(e)).then((function(){t.isLoading=!1,t.$router.push("/finish"),localStorage.removeItem("orderId"),t.emitter.emit("push-toast",{style:"success",title:"付款成功"})})).catch((function(e){t.emitter.emit("push-toast",{style:"danger",title:"付款失敗",content:e.response.data.message})}))}},mounted:function(){this.getOrder()}},m=(n("70e2"),n("6b0d")),I=n.n(m);const w=I()(v,[["render",h]]);e["default"]=w},"70e2":function(t,e,n){"use strict";n("9e39")},"99af":function(t,e,n){"use strict";var c=n("23e7"),a=n("da84"),s=n("d039"),l=n("e8b5"),r=n("861d"),i=n("7b0b"),o=n("07fa"),u=n("8418"),d=n("65f0"),b=n("1dde"),O=n("b622"),g=n("2d00"),p=O("isConcatSpreadable"),j=9007199254740991,f="Maximum allowed index exceeded",h=a.TypeError,y=g>=51||!s((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),v=b("concat"),m=function(t){if(!r(t))return!1;var e=t[p];return void 0!==e?!!e:l(t)},I=!y||!v;c({target:"Array",proto:!0,forced:I},{concat:function(t){var e,n,c,a,s,l=i(this),r=d(l,0),b=0;for(e=-1,c=arguments.length;e<c;e++)if(s=-1===e?l:arguments[e],m(s)){if(a=o(s),b+a>j)throw h(f);for(n=0;n<a;n++,b++)n in s&&u(r,b,s[n])}else{if(b>=j)throw h(f);u(r,b++,s)}return r.length=b,r}})},"9e39":function(t,e,n){},af6f:function(t,e,n){"use strict";n("114d")},b0c0:function(t,e,n){var c=n("83ab"),a=n("5e77").EXISTS,s=n("e330"),l=n("9bf2").f,r=Function.prototype,i=s(r.toString),o=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=s(o.exec),d="name";c&&!a&&l(r,d,{configurable:!0,get:function(){try{return u(o,i(this))[1]}catch(t){return""}}})},c2a1:function(t,e,n){"use strict";var c=n("7a23"),a=n("cd2c"),s=n.n(a),l={class:"loading-bg"},r=Object(c["h"])('<div class="load-content"><div class="load-img"><img src="'+s.a+'" alt="母雞動圖"></div><div class="load-txt"><span style="--i:1;">N</span><span style="--i:2;">o</span><span style="--i:3;">w</span><span style="--i:4;"> </span><span style="--i:5;">L</span><span style="--i:6;">o</span><span style="--i:7;">a</span><span style="--i:8;">d</span><span style="--i:9;">i</span><span style="--i:10;">n</span><span style="--i:11;">g</span></div></div>',1),i=[r];function o(t,e){return Object(c["z"])(),Object(c["f"])("div",l,i)}n("af6f");var u=n("6b0d"),d=n.n(u);const b={},O=d()(b,[["render",o]]);e["a"]=O},cd2c:function(t,e,n){t.exports=n.p+"img/chicken.f41d8263.gif"}}]);
//# sourceMappingURL=chunk-acd64a80.989ece76.js.map