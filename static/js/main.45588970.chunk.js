(this.webpackJsonplaxx=this.webpackJsonplaxx||[]).push([[0],{26:function(e,t,n){e.exports=n(36)},31:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),r=n(21),s=n.n(r),a=n(23),d=n(6),l=(n(31),n(22)),c=n(14),m=n(12),y=n(11),u=n(13),h=n(8),b=n(10),g=n(1),p=n.n(g);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=["https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/a670f7e5-7dbd-45b6-a3e7-7ed87d61aef21587488311633-stand1.png","https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/595f5b66-c34a-4b33-842c-c76eea598e511587488312734-jump1.png"],E=0,x={x:0,y:100},S={x:0,y:280},B=function(){function e(t,n,i){var o=this;Object(h.a)(this,e),this.movement=!0,this.position=0,this.changePosition=function(){o.position++;var e=o.position%3;if(0==e){o.movement=!1;var t=S.y-x.y;o.moveTo(t)}else if(1==e){o.movement=!1;var n=x.y+10;o.moveTo(n),setTimeout((function(){o.changePosition()}),1200)}else if(2==e){o.movement=!0,o.moveSlab(),g.Body.setPosition(o.body,{x:0,y:0});var i=window.innerHeight-S.y;o.moveTo(i)}},this.myEngine=t,this.body=g.Bodies.rectangle(window.innerWidth/2,window.innerHeight-n.y,120,25,{isStatic:!0}),g.World.add(this.myEngine.world,[this.body]),this.position=i}return Object(b.a)(e,[{key:"moveSlab",value:function(){var e=this,t=this.body,n=1;requestAnimationFrame((function i(){1==n?(g.Body.translate(t,{x:3,y:0}),t.position.x>window.innerWidth&&(n=-1)):(g.Body.translate(t,{x:-3,y:0}),t.position.x<0&&(n=1)),e.movement&&requestAnimationFrame(i)}))}},{key:"moveTo",value:function(e){var t=this.body;requestAnimationFrame((function n(){e--,g.Body.translate(t,{x:0,y:1}),e>0&&requestAnimationFrame(n)}))}}]),e}(),j=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(c.a)(this,Object(m.a)(t).call(this,e))).myEngine=null,n.myRender=null,n.myWorld=null,n.myPlayer=null,n.isJumping=!1,n.slab=null,n.slab1=null,n.slab2=null,n.createLevel=function(){var e=g.Bodies.rectangle(window.innerWidth/2,window.innerHeight-x.y-100,50,70,{inertia:1/0,render:{sprite:{texture:v[E],xScale:.16,yScale:.16}}});n.myPlayer=e,g.World.add(n.myEngine.world,[e]),document.addEventListener("keydown",n.jumpme),document.addEventListener("click",n.jumpme),n.slab1=new B(n.myEngine,x,0),n.slab2=new B(n.myEngine,S,2),n.slab2.moveSlab(),n.slab=n.slab2;requestAnimationFrame((function e(){n.isDead()?alert("dead"):requestAnimationFrame(e)}))},n.createCompound=function(){var e=g.Bodies.rectangle(window.innerWidth/2,0,window.innerWidth,60,{isStatic:!0}),t=g.Bodies.rectangle(window.innerWidth/2,window.innerHeight,window.innerWidth,60,{isStatic:!0}),i=g.Bodies.rectangle(0,window.innerHeight/2,60,window.innerHeight,{isStatic:!0}),o=g.Bodies.rectangle(window.innerWidth,window.innerHeight/2,60,window.innerHeight,{isStatic:!0});g.World.add(n.myEngine.world,[t,i,o,e])},n.jumpme=function(e){if(!n.isJumping){n.isJumping=!0;var t=n.myPlayer,i=n.slab.body;t.render.sprite.texture=v[1],setTimeout((function(){o()}),1e3),g.Body.setVelocity(t,{x:0,y:-13});var o=function(){g.Body.set(t,"isSensor",!1),t.render.sprite.texture=v[0],n.isJumping=!1};requestAnimationFrame((function e(){if(t.velocity.y>0&&n.isSlabColliding()){g.Body.set(t,"isSensor",!1),n.setState({score:n.state.score+10}),n.slabCollided(),o();t.position.x,i.bounds.min.y}n.isJumping&&requestAnimationFrame(e)}));Object(y.a)(n)}},n.isSlabColliding=function(){var e=n.myPlayer,t=n.slab.body;p.a.SAT.collides(t,e);return e.bounds.max.y-4<t.bounds.min.y&&e.position.y<t.position.y&&e.position.x>=t.bounds.min.x&&e.position.x<=t.bounds.max.x},n.isDead=function(){var e=n.myPlayer.position,t=e.x,i=e.y;return t<0||t>window.innerWidth||i>window.innerHeight},n.slabCollided=function(){n.slab.movement=!1,setTimeout((function(){n.slab1.changePosition(),n.slab2.changePosition()}),1e3),n.slab===n.slab1?n.slab=n.slab2:n.slab=n.slab1},n.state={score:0,intro:!0},n}return Object(u.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.setState({intro:!1})}),5e3),this.myEngine=g.Engine.create(),this.myRender=g.Render.create({element:this.ele,engine:this.myEngine,options:{width:window.innerWidth,height:window.innerHeight,background:"transparent",wireframes:!1}}),g.Engine.run(this.myEngine),g.Render.run(this.myRender),this.createLevel()}},{key:"render",value:function(){var e=this;this.state.score>=50&&alert("win");var t={position:"fixed",top:0,left:0,right:0,textAlign:"center",background:"black",color:"white",width:"150px",margin:"auto",padding:"5px"};return o.a.createElement("div",{style:{backgroundImage:"url('https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/0a883011-5808-44b5-9ef3-ab4395af3c881587491196565-Untitled.jpg')",backgroundSize:"100% 100%"}},o.a.createElement("div",{style:t},"Score : ",this.state.score),o.a.createElement("div",{ref:function(t){return e.ele=t}}),this.state.intro&&o.a.createElement("div",{style:f({},t,{top:"30%",width:"80%",padding:"20px",background:"grey",border:"2px solid black",color:"white"})},"Jump 5 slabs to get 50 points to complete the game.",o.a.createElement("br",null),"If you get to the spikes, you are dead and game over"))}}]),t}(i.Component),k=window.innerHeight,O=window.innerWidth,W=k<660,P=function e(t,n){var i=this;Object(h.a)(this,e),this.move=function(){var e=O;requestAnimationFrame((function t(){e--,g.Body.translate(i.body,{x:2,y:0}),e<0&&(e=O,i.body.isStatic||g.Body.set(i.body,"isStatic",!0),i.body.isSensor&&g.Body.set(i.body,"isSensor",!1),g.Body.setPosition(i.body,{x:30,y:i.posY})),requestAnimationFrame(t)}))},this.myEngine=t,this.myRender=n,this.posY=W?Math.floor(100*Math.random()+20):Math.floor(200*Math.random()+100),this.body=g.Bodies.circle(30,this.posY,20,{isStatic:!0,label:"score",render:{fillStyle:"#"+((1<<24)*Math.random()|0).toString(16)}}),g.World.add(this.myEngine.world,[this.body]),this.move()},A=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(c.a)(this,Object(m.a)(t).call(this,e))).myEngine=null,n.myRender=null,n.myWorld=null,n.state={score:0},n}return Object(u.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.myEngine=g.Engine.create(),this.myRender=g.Render.create({element:this.ele,engine:this.myEngine,options:{width:window.innerWidth,height:window.innerHeight,background:"transparent",wireframes:!1}}),g.Engine.run(this.myEngine),g.Render.run(this.myRender);var t=k-200,n={density:.004,label:"rock"},i=g.Bodies.polygon(200,t,8,20,n),o=g.Constraint.create({pointA:{x:100,y:t},bodyB:i,stiffness:.05,render:{type:"line",strokeStyle:"#304251"}}),r=g.Constraint.create({pointA:{x:300,y:t},bodyB:i,stiffness:.05,render:{type:"line",strokeStyle:"#304251"}});g.World.add(this.myEngine.world,[i,o,r]);var s=g.Mouse.create(this.myRender.canvas),a=g.MouseConstraint.create(this.myEngine,{mouse:s,constraint:{stiffness:.2,render:{visible:!1}}});g.World.add(this.myEngine.world,a),this.myRender.mouse=s;var d=this;g.Events.on(this.myEngine,"afterUpdate",(function(){-1===a.mouse.button&&i.position.y<t&&(i=g.Bodies.polygon(200,t,8,20,n),g.World.add(d.myEngine.world,i),o.bodyB=i,r.bodyB=i)}));for(var l=0;l<10;l++)setTimeout((function(){new P(e.myEngine,e.myRender)}),1e3*l);g.Events.on(this.myEngine,"collisionStart",(function(t){var n=t.pairs,i=n[0],o=i.bodyA,r=i.bodyB;o.isSensor||r.isSensor||(g.Body.set(n[0].bodyA,"isStatic",!1),g.Body.set(n[0].bodyB,"isStatic",!1),g.Body.set(n[0].bodyA,"isSensor",!0),g.Body.set(n[0].bodyB,"isSensor",!0),g.Body.setVelocity(o,{x:0,y:2}),g.Body.setVelocity(r,{x:0,y:2}),e.setState({score:e.state.score+10}))}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:{backgroundImage:"url('https://cdn.dribbble.com/users/375867/screenshots/3200773/shady-forest-game-background.png')",backgroundSize:"100% 100%"}},o.a.createElement("div",{style:{position:"fixed",top:0,left:0,right:0,textAlign:"center",background:"black",color:"white",width:"150px",margin:"auto",padding:"5px"}},"Score : ",this.state.score),o.a.createElement("div",{ref:function(t){return e.ele=t}}))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(a.a,null,o.a.createElement(d.c,null,o.a.createElement(d.a,{path:"/sling"},o.a.createElement(A,null)),o.a.createElement(d.a,{path:"/jump"},o.a.createElement(j,null)),o.a.createElement(d.a,{path:"/"},"/jump :  matter js jump",o.a.createElement("br",null),"/sling :  matter js sling shooter"))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.45588970.chunk.js.map