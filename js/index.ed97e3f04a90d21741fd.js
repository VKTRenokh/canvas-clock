"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[826],{772:function(t,n,e){var r=e(441),i=e.n(r),o=e(458),a=e.n(o),u=e(49),c=a()(i());c.i(u.Z),c.push([t.id,"body {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}","",{version:3,sources:["webpack://./index.scss%23sass","webpack://./index.scss"],names:[],mappings:"AAAwB;EAAK,aAAA;EAAa,uBAAA;EAAuB,mBAAA;ACKjE",sourcesContent:["@import'~normalize.css';body{display:flex;justify-content:center;align-items:center}","@import '~normalize.css';\n\nbody {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"],sourceRoot:""}]),n.Z=c},133:function(t,n,e){var r=e(85),i=e(912),o=e(502),a=e(724),u=e(597),c=function(){function t(n,e,r,o){(0,i.Z)(this,t),this.node=document.createElement(e),this.node.className=r||"",this.node.textContent=o||"",n.append(this.node)}return(0,r.Z)(t,[{key:"destroy",value:function(){this.node.remove()}}]),t}(),s=e(388),l=e.n(s),f=e(354),h=e.n(f),d=e(375),v=e.n(d),m=e(815),A=e.n(m),p=e(722),y=e.n(p),R=e(118),g=e.n(R),x=e(772),Z={};Z.styleTagTransform=g(),Z.setAttributes=A(),Z.insert=v().bind(null,"head"),Z.domAPI=h(),Z.insertStyleElement=y(),l()(x.Z,Z),x.Z&&x.Z.locals&&x.Z.locals;var B=e(149),E=e(595),b=e(452),w=e(967),F=e(305),P=e(622),C=e.n(P),_=function t(n){var e;return{map:function(e){return n?t(e(n)):t(null)},ap:function(e){return n&&e.value?t(e.value(n)):t(null)},equals:function(t){return t.value===n},chain:function(e){return n?t(e(n)):t(null)},fmap:function(e){return n?e(n):t(null)},getOrElse:function(t){return null===n?t:n},merge:function(t){return this.fmap(function(n){return t.map(function(t){return[n,t]})})},asyncMap:(e=(0,F.Z)(C().mark(function e(r){return C().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",null===n?t(null):r(n).then(function(n){return t(n)}));case 1:case"end":return e.stop()}},e)})),function(t){return e.apply(this,arguments)}),get value(){return n}}},k=e(725),S=[1,0,0,1],T=[0,1,0,1],L=[0,0,1,1],M=[0,1,1,1],U=[1,1,0,1],V=[1,0,1,1],I=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],D=e(211),O=function(){function t(n){(0,i.Z)(this,t),(0,w.Z)(this,"position",null),(0,w.Z)(this,"color",null),(0,w.Z)(this,"normal",null),(0,w.Z)(this,"indices",null),this.gl=n,this.position=this.initPositionBuffer(),this.color=this.initColorBuffer(),this.indices=this.initIndexBuffer()}return(0,r.Z)(t,[{key:"initColorBuffer",value:function(){var t,n=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,(t=[S,T,L,M,U,V],new Float32Array(t.flatMap(function(t){return[].concat((0,D.Z)(t),(0,D.Z)(t),(0,D.Z)(t),(0,D.Z)(t))}))),this.gl.STATIC_DRAW),n}},{key:"initPositionBuffer",value:function(){var t=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1]),this.gl.STATIC_DRAW),t}},{key:"initIndexBuffer",value:function(){var t=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(I),this.gl.STATIC_DRAW),t}}]),t}(),Y=function(t){(0,o.Z)(c,t);var n,e=(n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}(),function(){var t,e=(0,u.Z)(c);if(n){var r=(0,u.Z)(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return(0,a.Z)(this,t)});function c(t,n,r){var o;return(0,i.Z)(this,c),o=e.call(this,t,"canvas"),(0,w.Z)((0,E.Z)(o),"frame",_(null)),(0,w.Z)((0,E.Z)(o),"ctx",_(null)),(0,w.Z)((0,E.Z)(o),"speed",.001),o.node.width=n,o.node.height=r,o.ctx=_(o.node.getContext("webgl2")),o.redraw(),o}return(0,r.Z)(c,[{key:"loadShader",value:function(t,n,e){return _(t.createShader(n)).map(function(n){return t.shaderSource(n,e),t.compileShader(n),n})}},{key:"attachShader",value:function(t,n,e){n.merge(e).map(function(n){var e=(0,B.Z)(n,2),r=e[0],i=e[1];t.attachShader(r,i)})}},{key:"initShader",value:function(t,n,e){var r=this.loadShader(t,t.VERTEX_SHADER,n),i=this.loadShader(t,t.FRAGMENT_SHADER,e),o=_(t.createProgram());return this.attachShader(t,o,r),this.attachShader(t,o,i),o.map(function(n){return t.linkProgram(n),n})}},{key:"initBuffers",value:function(t){return new O(t)}},{key:"drawScene",value:function(t,n,e,r,i,o){t.clearColor(1,.49,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);var a=t.canvas.width/t.canvas.height,u=k.Ue();k.G3(u,45*Math.PI/180,a,.1,500);var c=k.Ue();k.Iu(c,c,[0,0,-6]),k.U1(c,c,r,[0,0,1]),k.U1(c,c,i,[0,1,0]),k.U1(c,c,o,[1,0,0]),this.setPosition(t,n,e),this.setColor(t,n,e),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.indices),t.useProgram(n.program),t.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,u),t.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,c),t.drawElements(t.TRIANGLE_STRIP,36,t.UNSIGNED_SHORT,0)}},{key:"setPosition",value:function(t,n,e){t.bindBuffer(t.ARRAY_BUFFER,e.position),t.vertexAttribPointer(n.attribLocations.vertexPosition,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(n.attribLocations.vertexPosition)}},{key:"setColor",value:function(t,n,e){t.bindBuffer(t.ARRAY_BUFFER,e.color),t.vertexAttribPointer(n.attribLocations.vertexColor,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(n.attribLocations.vertexColor)}},{key:"redraw",value:function(){var t=this;this.ctx.map(function(n){var e=t.initShader(n,"\n          attribute vec4 aVertexPosition;\n          attribute vec4 aVertexColor;\n\n          uniform mat4 uModelViewMatrix;\n          uniform mat4 uProjectionMatrix;\n\n          varying lowp vec4 vColor;\n\n          void main(void) {\n            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n            vColor = aVertexColor;\n          }\n","\n         varying lowp vec4 vColor;\n\n         void main(void) {\n           gl_FragColor = vColor;\n         }\n      ");t.initBuffers(n),e.map(function(e){var r={program:e,uniformLocations:{projectionMatrix:n.getUniformLocation(e,"uProjectionMatrix"),modelViewMatrix:n.getUniformLocation(e,"uModelViewMatrix")},attribLocations:{vertexPosition:n.getAttribLocation(e,"aVertexPosition"),vertexColor:n.getAttribLocation(e,"aVertexColor")}},i=0,o=0,a=function e(a){t.drawScene(n,r,t.initBuffers(n),0,i,o),t.frame=_(requestAnimationFrame(e))};t.frame=_(requestAnimationFrame(a)),t.node.onclick=function(){t.node.requestPointerLock()},window.onmousemove=function(t){o+=t.movementY/100,i+=t.movementX/100}})})}},{key:"changeSpeed",value:function(){}},{key:"destroy",value:function(){this.frame.map(function(t){return cancelAnimationFrame(t)}),(0,b.Z)((0,u.Z)(c.prototype),"destroy",this).call(this)}}]),c}(c);new(function(t){(0,o.Z)(c,t);var n,e=(n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}(),function(){var t,e=(0,u.Z)(c);if(n){var r=(0,u.Z)(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return(0,a.Z)(this,t)});function c(t){var n;return(0,i.Z)(this,c),(n=e.call(this,t,"div")).clock=new Y(n.node,window.innerWidth,window.innerHeight),n}return(0,r.Z)(c)}(c))(document.body)}},function(t){t.O(0,[216],function(){return t(t.s=133)}),t.O()}]);
//# sourceMappingURL=index.ed97e3f04a90d21741fd.js.map