(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d2a043c"],{2917:function(t,e,c){t.exports=c.p+"img/TVbg.81b9c6bc.png"},"361d":function(t,e,c){t.exports=c.p+"img/goddess_happy.f9c83dfe.png"},"53d1":function(t,e,c){"use strict";c.r(e);var n=c("7a23"),s=c("361d"),a=c.n(s),i=c("2917"),o=c.n(i),u=c("bbb8"),l=c.n(u),b=c("91a8"),g=c.n(b),m=c("b4a5"),r=c.n(m),j=c("79ba"),O=c.n(j),d={key:0,class:"coupon"},p={class:"coupon-area"},h=Object(n["g"])("i",{class:"fa-solid fa-xmark"},null,-1),f=[h],w=Object(n["g"])("div",{class:"coupon-img"},[Object(n["g"])("img",{src:a.a,alt:"女神高興表情"})],-1),k={class:"coupon-txt"},N=Object(n["i"])("優惠碼: "),v=Object(n["g"])("strong",{id:"coupon"},"megami666",-1),y={class:"game-section"},R={class:"container"},C={class:"game"},I=Object(n["g"])("img",{class:"game-TV-bg",src:o.a,alt:"電視背景圖"},null,-1),x=Object(n["g"])("img",{class:"game-pad-bg",src:l.a,alt:"平板背景圖"},null,-1),z={class:"talk-section"},D=Object(n["g"])("p",null,"嗨~ 和我一起玩數字猜大小遊戲吧!",-1),S=Object(n["g"])("p",null,"數字範圍是0~9喔",-1),G=Object(n["g"])("span",null,[Object(n["i"])("點擊對話框開始遊戲"),Object(n["g"])("i",{class:"fa-solid fa-caret-down"})],-1),_=Object(n["g"])("div",{class:"megami"},[Object(n["g"])("img",{src:g.a,alt:"女神一般表情"})],-1),A=[D,S,G,_],J={key:0,class:"talk"},M={class:"game-btn"},T=Object(n["g"])("div",{class:"megami"},[Object(n["g"])("img",{src:g.a,alt:"女神一般表情"})],-1),V=Object(n["g"])("p",null,"答對啦!!繼續吧~~",-1),B=Object(n["g"])("span",null,[Object(n["i"])("點擊對話框繼續遊戲"),Object(n["g"])("i",{class:"fa-solid fa-caret-down"})],-1),E=Object(n["g"])("div",{class:"megami"},[Object(n["g"])("img",{src:a.a,alt:"女神高興表情"})],-1),q=Object(n["g"])("span",null,[Object(n["i"])("點擊對話框重新遊戲"),Object(n["g"])("i",{class:"fa-solid fa-caret-down"})],-1),F=Object(n["g"])("div",{class:"megami"},[Object(n["g"])("img",{src:r.a,alt:"女神失望表情"})],-1),H=Object(n["g"])("span",null,[Object(n["i"])("點擊對話框繼續遊戲"),Object(n["g"])("i",{class:"fa-solid fa-caret-down"})],-1),K=Object(n["g"])("div",{class:"megami"},[Object(n["g"])("img",{src:O.a,alt:"女神驚訝表情"})],-1);function L(t,e,c,s,a,i){return Object(n["z"])(),Object(n["f"])(n["a"],null,[a.score>=3?(Object(n["z"])(),Object(n["f"])("div",d,[Object(n["g"])("div",p,[Object(n["g"])("span",{class:"close",onClick:e[0]||(e[0]=function(){return i.resetGame&&i.resetGame.apply(i,arguments)})},f),w,Object(n["g"])("div",k,[Object(n["g"])("p",null,"連續答對"+Object(n["I"])(a.score)+"次太厲害了! 就送你優惠碼吧!",1),Object(n["g"])("p",null,[N,v,Object(n["g"])("button",{type:"button",onClick:e[1]||(e[1]=function(){return i.copyCoupon&&i.copyCoupon.apply(i,arguments)})},"複製")])])])])):Object(n["e"])("",!0),Object(n["g"])("div",y,[Object(n["g"])("div",R,[Object(n["g"])("div",C,[I,x,Object(n["g"])("div",z,["start"===a.gameStatus?(Object(n["z"])(),Object(n["f"])("div",{key:0,class:"talk",onClick:e[2]||(e[2]=function(t){return a.gameStatus="play"})},A)):Object(n["e"])("",!0),"play"===a.gameStatus||"continue"===a.gameStatus?(Object(n["z"])(),Object(n["f"])(n["a"],{key:1},[1===a.runDown?(Object(n["z"])(),Object(n["f"])("div",J,[Object(n["g"])("p",null,"現在數字是"+Object(n["I"])(a.newNum)+"，下個數字會比較...",1),Object(n["g"])("div",M,[Object(n["g"])("button",{type:"button",onClick:e[3]||(e[3]=function(t){return i.guessNum("big")})},"大"),Object(n["g"])("button",{type:"button",onClick:e[4]||(e[4]=function(t){return i.guessNum("small")})},"小")]),T])):Object(n["e"])("",!0),2===a.runDown?(Object(n["z"])(),Object(n["f"])(n["a"],{key:1},["right"===a.gameResult?(Object(n["z"])(),Object(n["f"])("div",{key:0,class:"talk",onClick:e[5]||(e[5]=function(t){return a.runDown=1})},[Object(n["g"])("p",null,"結果是"+Object(n["I"])(a.newNum)+"，剛剛是"+Object(n["I"])(a.oldNum)+"，你選的是"+Object(n["I"])(a.choice)+"，所以...",1),V,B,E])):Object(n["e"])("",!0),"wrong"===a.gameResult?(Object(n["z"])(),Object(n["f"])("div",{key:1,class:"talk",onClick:e[6]||(e[6]=function(){return i.resetGame&&i.resetGame.apply(i,arguments)})},[Object(n["g"])("p",null,"結果是"+Object(n["I"])(a.newNum)+"，剛剛是"+Object(n["I"])(a.oldNum)+"，你選的是"+Object(n["I"])(a.choice)+"，所以...",1),Object(n["g"])("p",null,"答錯囉，總共連續答對"+Object(n["I"])(a.score)+"次，要再玩一次嗎?",1),q,F])):Object(n["e"])("",!0),"nothing"===a.gameResult?(Object(n["z"])(),Object(n["f"])("div",{key:2,class:"talk",onClick:e[7]||(e[7]=function(t){return a.runDown=1})},[Object(n["g"])("p",null,"結果是"+Object(n["I"])(a.newNum)+"，剛剛是"+Object(n["I"])(a.oldNum)+"，剛好一樣呢，再猜一次吧~",1),H,K])):Object(n["e"])("",!0)],64)):Object(n["e"])("",!0)],64)):Object(n["e"])("",!0)])])])])],64)}var P={data:function(){return{newNum:"",oldNum:"",count:0,score:0,gameResult:"",gameStatus:"start",choice:"",runDown:1}},methods:{ramdemNumber:function(){this.newNum=Math.floor(10*Math.random())},guessNum:function(t){this.oldNum=this.newNum,this.ramdemNumber(),this.checkAnwser(t),this.runDown=2},checkAnwser:function(t){"big"===t?(this.choice="大",this.newNum>this.oldNum?(this.gameResult="right",this.count++):this.newNum<this.oldNum?(this.gameResult="wrong",this.score=this.count):this.gameResult="nothing"):"small"===t&&(this.choice="小",this.newNum<this.oldNum?(this.gameResult="right",this.count++):this.newNum>this.oldNum?(this.gameResult="wrong",this.score=this.count):this.gameResult="nothing")},resetGame:function(){this.ramdemNumber(),this.gameStatus="start",this.runDown=1,this.score=0,this.count=0},copyCoupon:function(){var t=document.createRange();t.selectNode(document.getElementById("coupon"));var e=window.getSelection();e.removeAllRanges(),e.addRange(t),document.execCommand("copy")}},mounted:function(){this.resetGame()}},Q=(c("bcae"),c("6b0d")),U=c.n(Q);const W=U()(P,[["render",L]]);e["default"]=W},"79ba":function(t,e,c){t.exports=c.p+"img/goddess_concerned.4fa2d671.png"},"91a8":function(t,e,c){t.exports=c.p+"img/goddess_everyday.db52c95a.png"},ac5e:function(t,e,c){},b4a5:function(t,e,c){t.exports=c.p+"img/goddess_sad.ce540ceb.png"},bbb8:function(t,e,c){t.exports=c.p+"img/pad.155423d2.png"},bcae:function(t,e,c){"use strict";c("ac5e")}}]);
//# sourceMappingURL=chunk-4d2a043c.ed0de813.js.map