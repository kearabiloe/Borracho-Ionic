webpackJsonp([19],{116:function(e,t,n){"use strict";n(2),n(0);var a=function(){return function(e){for(var t in e)this[t]=e[t]}}();n.d(t,"a",function(){return r});var r=function(){function e(){this.items=[],this.defaultItem={name:"Burt Bear",profilePic:"assets/img/speakers/bear.jpg",about:"Burt is a Bear."};for(var e=0,t=[{name:"Burt Bear",profilePic:"assets/img/speakers/bear.jpg",about:"Burt is a Bear."},{name:"Charlie Cheetah",profilePic:"assets/img/speakers/cheetah.jpg",about:"Charlie is a Cheetah."},{name:"Donald Duck",profilePic:"assets/img/speakers/duck.jpg",about:"Donald is a Duck."},{name:"Eva Eagle",profilePic:"assets/img/speakers/eagle.jpg",about:"Eva is an Eagle."},{name:"Ellie Elephant",profilePic:"assets/img/speakers/elephant.jpg",about:"Ellie is an Elephant."},{name:"Molly Mouse",profilePic:"assets/img/speakers/mouse.jpg",about:"Molly is a Mouse."},{name:"Paul Puppy",profilePic:"assets/img/speakers/puppy.jpg",about:"Paul is a Puppy."}];e<t.length;e++){this.items.push(new a(t[e]))}}return e.prototype.query=function(e){return e?this.items.filter(function(t){for(var n in e){var a=t[n];if("string"==typeof a&&a.toLowerCase().indexOf(e[n].toLowerCase())>=0)return t;if(a==e[n])return t}return null}):this.items},e.prototype.add=function(e){this.items.push(e)},e.prototype.delete=function(e){this.items.splice(this.items.indexOf(e),1)},e}()},117:function(e,t,n){"use strict";n.d(t,"a",function(){return a});n(2);var a=function(){function e(e,t){this.storage=e,this.SETTINGS_KEY="Borracho_settings",this._defaults=t}return e.prototype.load=function(){var e=this;return this.storage.get(this.SETTINGS_KEY).then(function(t){return t?(e.settings=t,e._mergeDefaults(e._defaults)):e.setAll(e._defaults).then(function(t){e.settings=t})})},e.prototype._mergeDefaults=function(e){for(var t in e)t in this.settings||(this.settings[t]=e[t]);return this.setAll(this.settings)},e.prototype.merge=function(e){for(var t in e)this.settings[t]=e[t];return this.save()},e.prototype.setValue=function(e,t){return this.settings[e]=t,this.storage.set(this.SETTINGS_KEY,this.settings)},e.prototype.setAll=function(e){return this.storage.set(this.SETTINGS_KEY,e)},e.prototype.getValue=function(e){return this.storage.get(this.SETTINGS_KEY).then(function(t){return t[e]})},e.prototype.save=function(){return this.setAll(this.settings)},Object.defineProperty(e.prototype,"allSettings",{get:function(){return this.settings},enumerable:!0,configurable:!0}),e}()},162:function(e,t,n){"use strict";n.d(t,"a",function(){return o});n(2);var a=n(136),r=n(163),o=function(){function e(e){this.http=e,this.url=r.a.parseServerUrl}return e.prototype.get=function(e,t,n){if(n||(n={params:new a.g}),t){n.params=new a.g;for(var r in t)n.params=n.params.set(r,t[r])}return this.http.get(this.url+"/"+e,n)},e.prototype.post=function(e,t,n){return this.http.post(this.url+"/"+e,t,n)},e.prototype.put=function(e,t,n){return this.http.put(this.url+"/"+e,t,n)},e.prototype.delete=function(e,t){return this.http.delete(this.url+"/"+e,t)},e.prototype.patch=function(e,t,n){return this.http.patch(this.url+"/"+e,t,n)},e}()},163:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={production:!1,parseAppId:"Borracho",parseServerUrl:"https://ac-parse-server.herokuapp.com/parse"}},180:function(e,t,n){"use strict";n(162);var a=n(117);n.d(t,"a",function(){return a.a});n(247)},181:function(e,t,n){"use strict";n.d(t,"a",function(){return s});n(2);var a=n(8),r=(n.n(a),n(141)),o=(n.n(r),n(248)),i=(n.n(o),n(163)),l=function(){return function(){}}(),s=function(){function e(){this.parseAppId=i.a.parseAppId,this.parseServerUrl=i.a.parseServerUrl,this.parseInitialize(),console.log("Initiated Auth")}return e.prototype.signin=function(e,t){return new a.Observable(function(n){o.Parse.User.logIn(e,t).then(function(e){console.log(e),n.next(!0),n.complete()}).catch(function(e){console.error(e),n.error(e),n.complete()})})},e.prototype.signup=function(e){return new a.Observable(function(t){var n=new o.Parse.User;n.set("name",e.name),n.set("username",e.username),n.set("password",e.password),n.set("email",e.email),n.signUp(null).then(function(e){console.log("signup successfull"),t.next(!0),t.complete()}).catch(function(e){console.error(e),t.error(e),t.complete()})})},e.prototype.signout=function(){return new a.Observable(function(e){o.Parse.User.logOut().then(function(){return e.next(!0)})})},e.prototype.currentUser=function(){var e=o.Parse.User.current();if(e){var t=new l;return t.id=e.id,t.name=e.get("username"),t.email=e.get("email"),t}return null},e.prototype.authenticated=function(){return null!==this.currentUser()},e.prototype.parseInitialize=function(){o.Parse.initialize(this.parseAppId),o.Parse.serverURL=this.parseServerUrl},e}()},182:function(e,t,n){"use strict";n.d(t,"a",function(){return i});n(2);var a=n(141),r=(n.n(a),n(248)),o=(n.n(r),n(163)),i=function(){function e(){this.parseAppId=o.a.parseAppId,this.parseServerUrl=o.a.parseServerUrl,this.parseInitialize(),console.log("Initiated Parse")}return e.prototype.getRentalProperties=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=3),new Promise(function(n,a){setTimeout(function(){var o=r.Parse.Object.extend("RentalProperties"),i=new r.Parse.Query(o);i.skip(e),i.limit(t),i.find().then(function(e){n(e)},function(e){a(e)})},500)})},e.prototype.getRentalProperty=function(e){return new Promise(function(t,n){setTimeout(function(){var a=r.Parse.Object.extend("RentalProperties");new r.Parse.Query(a).get(e).then(function(e){t(e)},function(e){n(e)})},500)})},e.prototype.addRentalProperty=function(e){var t=new(r.Parse.Object.extend("RentalProperties"));return t.set("name",e.name),t.set("street_address",e.street_address),t.set("suburb",e.suburb),t.set("price",e.price),t.set("propertyPic",e.propertyPic),t.save(null,{success:function(e){return console.log(e),e},error:function(e,t){return console.log(t),t}})},e.prototype.parseInitialize=function(){r.Parse.initialize(this.parseAppId),r.Parse.serverURL=this.parseServerUrl},e}()},214:function(e,t){function n(e){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+e+"'.")})}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=214},237:function(e,t,n){function a(e){var t=r[e];return t?n.e(t[1]).then(function(){return n(t[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var r={"../pages/cards/cards.module.ngfactory":[357,15],"../pages/chat-detail/chat-detail.module.ngfactory":[358,4],"../pages/chats/chats.module.ngfactory":[359,0],"../pages/content/content.module.ngfactory":[360,14],"../pages/item-create/item-create.module.ngfactory":[361,11],"../pages/item-detail/item-detail.module.ngfactory":[362,13],"../pages/laundry/laundry.module.ngfactory":[363,2],"../pages/list-master/list-master.module.ngfactory":[364,7],"../pages/login/login.module.ngfactory":[365,10],"../pages/menu/menu.module.ngfactory":[366,18],"../pages/rental-detail/rental-detail.module.ngfactory":[367,12],"../pages/rentals/rentals.module.ngfactory":[368,3],"../pages/search/search.module.ngfactory":[369,6],"../pages/settings/settings.module.ngfactory":[370,9],"../pages/signup/signup.module.ngfactory":[371,8],"../pages/studio/studio.module.ngfactory":[372,5],"../pages/tabs/tabs.module.ngfactory":[373,17],"../pages/tutorial/tutorial.module.ngfactory":[374,1],"../pages/welcome/welcome.module.ngfactory":[375,16]};a.keys=function(){return Object.keys(r)},a.id=237,e.exports=a},247:function(e,t,n){"use strict";n.d(t,"a",function(){return r});n(2);var a=n(333),r=(n.n(a),n(162),function(){function e(e){this.api=e,this.user={id:1,username:"",email:"",sessionToken:""},this.headers={"X-Parse-Application-Id":"Borracho"}}return e.prototype.login=function(e){var t=this,n=this.api.post("login",e,{headers:this.headers}).share();return n.subscribe(function(e){"success"==e.status&&t._loggedIn(e)},function(e){console.error("ERROR",e)}),n},e.prototype.signup=function(e){var t=this,n=this.api.post("signup",e).share();return n.subscribe(function(e){"success"==e.status&&t._loggedIn(e)},function(e){console.error("ERROR",e)}),n},e.prototype.logout=function(){this.user=null},e.prototype._loggedIn=function(e){this.user.id=e.get("objectId"),this.user.username=e.get("username"),this.user.email=e.get("email"),this.user.sessionToken=e.get("sessionToken"),console.log(this.user)},e}())},273:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return o}),n.d(t,"d",function(){return i}),n.d(t,"e",function(){return l});var a="TutorialPage",r="TabsPage",o="RentalsPage",i="LaundryPage",l="StudioPage"},278:function(e,t,n){"use strict";function a(e){return new b.a(e,{option1:!0,option2:"Ionitron J. Framework",option3:"3",option4:"Hello"})}function r(e){return l._21(0,[(e()(),l.Z(0,0,null,null,7,"button",[["class","item item-block"],["ion-item",""],["menuClose",""]],null,[[null,"click"]],function(e,t,n){var a=!0,r=e.component;if("click"===t){a=!1!==l._11(e,6).close()&&a}if("click"===t){a=!1!==r.openPage(e.context.$implicit)&&a}return a},O.b,O.a)),l.Y(1,1097728,null,3,U.a,[L.a,Y.a,l.j,l.z,[2,z.a]],null,null),l._17(335544320,7,{contentLabel:0}),l._17(603979776,8,{_buttons:1}),l._17(603979776,9,{_icons:1}),l.Y(5,16384,null,0,D.a,[],null,null),l.Y(6,16384,null,0,A.a,[x.a],{menuClose:[0,"menuClose"]},null),(e()(),l._19(7,2,["\n          ","\n        "]))],function(e,t){e(t,6,0,"")},function(e,t){e(t,7,0,t.context.$implicit.title)})}function o(e){return l._21(0,[l._17(402653184,1,{nav:0}),(e()(),l.Z(1,0,null,null,38,"ion-menu",[["role","navigation"]],null,null,null,Z.b,Z.a)),l._15(6144,null,K.a,null,[W.a]),l.Y(3,245760,null,2,W.a,[x.a,l.j,Y.a,G.a,l.z,X.a,q.l,V.a,J.a],{content:[0,"content"]},null),l._17(335544320,2,{menuContent:0}),l._17(335544320,3,{menuNav:0}),(e()(),l._19(-1,0,["\n    "])),(e()(),l.Z(7,0,null,0,20,"ion-header",[],null,null,null,null,null)),l.Y(8,16384,null,0,Q.a,[Y.a,l.j,l.z,[2,$.a]],null,null),(e()(),l._19(-1,null,["\n      "])),(e()(),l.Z(10,0,null,null,16,"ion-item",[["class","item item-block"]],null,null,null,O.b,O.a)),l.Y(11,1097728,null,3,U.a,[L.a,Y.a,l.j,l.z,[2,z.a]],null,null),l._17(335544320,4,{contentLabel:0}),l._17(603979776,5,{_buttons:1}),l._17(603979776,6,{_icons:1}),l.Y(15,16384,null,0,D.a,[],null,null),(e()(),l._19(-1,2,["\n          "])),(e()(),l.Z(17,0,null,0,4,"ion-avatar",[["item-start",""]],null,null,null,null,null)),l.Y(18,16384,null,0,ee.a,[],null,null),(e()(),l._19(-1,null,["\n            "])),(e()(),l.Z(20,0,null,null,0,"img",[["src","assets/img/appicon.png"]],null,null,null,null,null)),(e()(),l._19(-1,null,["\n          "])),(e()(),l._19(-1,2,["\n          "])),(e()(),l.Z(23,0,null,2,2,"ion-title",[],null,null,null,te.b,te.a)),l.Y(24,49152,null,0,ne.a,[Y.a,l.j,l.z,[2,ae.a],[2,re.a]],null,null),(e()(),l._19(-1,0,["\n            Borracho\n          "])),(e()(),l._19(-1,2,["\n        "])),(e()(),l._19(-1,null,["\n    "])),(e()(),l._19(-1,0,["\n\n    "])),(e()(),l.Z(29,0,null,0,9,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,oe.b,oe.a)),l.Y(30,4374528,[[2,4]],0,ie.a,[Y.a,G.a,V.a,l.j,l.z,J.a,X.a,l.u,[2,$.a],[2,le.a]],null,null),(e()(),l._19(-1,1,["\n      "])),(e()(),l.Z(32,0,null,1,5,"ion-list",[],null,null,null,null,null)),l.Y(33,16384,null,0,se.a,[Y.a,l.j,l.z,G.a,q.l,V.a],null,null),(e()(),l._19(-1,null,["\n        "])),(e()(),l.U(16777216,null,null,1,null,r)),l.Y(36,802816,null,0,ue.h,[l.I,l.F,l.p],{ngForOf:[0,"ngForOf"]},null),(e()(),l._19(-1,null,["\n      "])),(e()(),l._19(-1,1,["\n    "])),(e()(),l._19(-1,0,["\n\n  "])),(e()(),l._19(-1,null,["\n  "])),(e()(),l.Z(41,0,null,null,2,"ion-nav",[],null,null,null,ce.b,ce.a)),l._15(6144,null,K.a,null,[pe.a]),l.Y(43,4374528,[[1,4],["content",4]],0,pe.a,[[2,$.a],[2,le.a],J.a,Y.a,G.a,l.j,l.u,l.z,l.i,q.l,ge.a,[2,de.a],V.a,l.k],{root:[0,"root"]},null)],function(e,t){var n=t.component;e(t,3,0,l._11(t,43));e(t,36,0,n.pages);e(t,43,0,n.rootPage)},function(e,t){e(t,29,0,l._11(t,30).statusbarPadding,l._11(t,30)._hasRefresher)})}Object.defineProperty(t,"__esModule",{value:!0});var i=n(47),l=n(0),s=(n(2),n(136)),u=n(184),c=n(88),p=n(215),g=n(89),d=n(139),f=n(107),h=n(327),m=(n(168),n(182)),_=n(181),y=n(116),b=n(180),P=n(356),v=n(273),w=P.a.SplashScreen,C=function(){function e(e,t,n,a,r,o){var i=this;this.translate=e,this.config=a,this.statusBar=r,this.push=o,this.rootPage=v.a,this.pages=[{title:"Tutorial",component:"TutorialPage"},{title:"Welcome",component:"WelcomePage"},{title:"Tabs",component:"TabsPage"},{title:"Settings",component:"SettingsPage"}],t.ready().then(function(){i.statusBar.styleDefault(),w.hide(),i.initPush()}),this.initTranslate()}return e.prototype.initTranslate=function(){var e=this;this.translate.setDefaultLang("en");var t=this.translate.getBrowserLang();if(t)if("zh"===t){var n=this.translate.getBrowserCultureLang();n.match(/-CN|CHS|Hans/i)?this.translate.use("zh-cmn-Hans"):n.match(/-TW|CHT|Hant/i)&&this.translate.use("zh-cmn-Hant")}else this.translate.use(this.translate.getBrowserLang());else this.translate.use("en");this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(function(t){e.config.set("ios","backButtonText",t.BACK_BUTTON_TEXT)})},e.prototype.initPush=function(){this.push.hasPermission().then(function(e){e.isEnabled?console.log("We have permission to send push notifications"):console.log("We do not have permission to send push notifications")}),this.push.listChannels().then(function(e){return console.log("List of channels",e)});var e=this.push.init({android:{},browser:{pushServiceURL:"http://push.api.phonegap.com/v1/push"}});e.on("notification").subscribe(function(e){return console.log("Received a notification",e)}),e.on("registration").subscribe(function(e){return console.log("Device registered",e)}),e.on("error").subscribe(function(e){return console.error("Error with Push plugin",e)})},e.prototype.openPage=function(e){this.nav.setRoot(e.component)},e}(),T=function(e){return new h.a(e,"./assets/i18n/",".json")},S=function(){return function(){}}(),k=n(66),j=n(262),I=n(263),M=n(264),N=n(265),E=n(266),F=n(267),H=n(268),R=n(269),B=n(270),O=n(170),U=n(22),L=n(20),Y=n(1),z=n(53),D=n(74),A=n(123),x=n(31),Z=n(276),K=n(38),W=n(81),G=n(4),X=n(33),q=n(7),V=n(11),J=n(10),Q=n(108),$=n(5),ee=n(110),te=n(272),ne=n(75),ae=n(51),re=n(46),oe=n(271),ie=n(29),le=n(28),se=n(60),ue=n(16),ce=n(277),pe=n(62),ge=n(37),de=n(21),fe=n(35),he=n(117),me=l.X({encapsulation:2,styles:[],data:{}}),_e=l.V("ng-component",C,function(e){return l._21(0,[(e()(),l.Z(0,0,null,null,1,"ng-component",[],null,null,null,o,me)),l.Y(1,49152,null,0,C,[fe.a,G.a,he.a,Y.a,g.a,c.a],null,null)],null,null)},{},{},[]),ye=n(151),be=n(24),Pe=n(76),ve=n(77),we=n(79),Ce=n(78),Te=n(109),Se=n(145),ke=n(113),je=n(150),Ie=n(36),Me=n(122),Ne=n(169),Ee=n(68),Fe=n(52),He=n(118),Re=n(95),Be=n(156),Oe=n(153),Ue=n(120),Le=n(162),Ye=n(247),ze=n(261),De=n(152),Ae=n(149),xe=n(154),Ze=l.W(S,[k.b],function(e){return l._7([l._8(512,l.i,l.S,[[8,[j.a,I.a,M.a,N.a,E.a,F.a,H.a,R.a,B.a,_e]],[3,l.i],l.s]),l._8(5120,l.r,l._16,[[3,l.r]]),l._8(4608,ue.k,ue.j,[l.r,[2,ue.s]]),l._8(5120,l.b,l._1,[]),l._8(5120,l.p,l._9,[]),l._8(5120,l.q,l._12,[]),l._8(4608,i.c,i.q,[ue.c]),l._8(6144,l.D,null,[i.c]),l._8(4608,i.f,ye.a,[]),l._8(5120,i.d,function(e,t,n,a,r){return[new i.k(e,t),new i.o(n),new i.n(a,r)]},[ue.c,l.u,ue.c,ue.c,i.f]),l._8(4608,i.e,i.e,[i.d,l.u]),l._8(135680,i.m,i.m,[ue.c]),l._8(4608,i.l,i.l,[i.e,i.m]),l._8(6144,l.B,null,[i.l]),l._8(6144,i.p,null,[i.m]),l._8(4608,l.G,l.G,[l.u]),l._8(4608,i.h,i.h,[ue.c]),l._8(4608,i.i,i.i,[ue.c]),l._8(4608,s.i,s.o,[ue.c,l.w,s.m]),l._8(4608,s.p,s.p,[s.i,s.n]),l._8(5120,s.a,function(e){return[e]},[s.p]),l._8(4608,s.l,s.l,[]),l._8(6144,s.j,null,[s.l]),l._8(4608,s.h,s.h,[s.j]),l._8(6144,s.b,null,[s.h]),l._8(4608,s.f,s.k,[s.b,l.o]),l._8(4608,s.c,s.c,[s.f]),l._8(4608,be.r,be.r,[]),l._8(4608,be.d,be.d,[]),l._8(5120,Pe.b,T,[s.c]),l._8(4608,ve.a,ve.b,[]),l._8(4608,we.b,we.a,[]),l._8(4608,Ce.b,Ce.a,[]),l._8(4608,Te.a,Te.a,[]),l._8(4608,fe.a,fe.a,[Te.a,Pe.b,ve.a,we.b,Ce.b,fe.b,fe.c]),l._8(4608,Se.a,Se.a,[J.a,Y.a]),l._8(4608,ke.a,ke.a,[J.a,Y.a]),l._8(4608,je.a,je.a,[]),l._8(4608,L.a,L.a,[]),l._8(4608,Ie.a,Ie.a,[G.a]),l._8(4608,X.a,X.a,[Y.a,G.a,l.u,V.a]),l._8(4608,Me.a,Me.a,[J.a,Y.a]),l._8(5120,ue.f,Ne.c,[ue.q,[2,ue.a],Y.a]),l._8(4608,ue.e,ue.e,[ue.f]),l._8(5120,Ee.b,Ee.d,[J.a,Ee.a]),l._8(5120,de.a,de.b,[J.a,Ee.b,ue.e,Fe.b,l.i]),l._8(4608,He.a,He.a,[J.a,Y.a,de.a]),l._8(4608,Re.a,Re.a,[J.a,Y.a]),l._8(4608,Be.a,Be.a,[J.a,Y.a,de.a]),l._8(4608,Oe.a,Oe.a,[Y.a,G.a,V.a,J.a,q.l]),l._8(4608,Ue.a,Ue.a,[J.a,Y.a]),l._8(4608,ge.a,ge.a,[G.a,Y.a]),l._8(5120,d.b,d.d,[d.c]),l._8(4608,Le.a,Le.a,[s.c]),l._8(4608,y.a,y.a,[]),l._8(4608,Ye.a,Ye.a,[Le.a]),l._8(4608,u.a,u.a,[]),l._8(4608,c.a,c.a,[]),l._8(4608,p.a,p.a,[]),l._8(4608,g.a,g.a,[]),l._8(4608,m.a,m.a,[]),l._8(4608,_.a,_.a,[]),l._8(5120,he.a,a,[d.b]),l._8(512,ue.b,ue.b,[]),l._8(512,l.k,ze.a,[]),l._8(256,Y.b,{},[]),l._8(1024,De.a,De.b,[]),l._8(1024,G.a,G.b,[i.b,De.a,l.u]),l._8(1024,Y.a,Y.c,[Y.b,G.a]),l._8(512,V.a,V.a,[G.a]),l._8(512,x.a,x.a,[]),l._8(512,J.a,J.a,[Y.a,G.a,[2,x.a]]),l._8(512,q.l,q.l,[J.a]),l._8(256,Ee.a,{links:[{loadChildren:"../pages/cards/cards.module.ngfactory#CardsPageModuleNgFactory",name:"CardsPage",segment:"cards",priority:"low",defaultHistory:[]},{loadChildren:"../pages/chat-detail/chat-detail.module.ngfactory#ChatDetailPageModuleNgFactory",name:"ChatDetailPage",segment:"chat/:id",priority:"low",defaultHistory:[]},{loadChildren:"../pages/chats/chats.module.ngfactory#ChatsPageModuleNgFactory",name:"ChatsPage",segment:"chats",priority:"low",defaultHistory:[]},{loadChildren:"../pages/content/content.module.ngfactory#ContentPageModuleNgFactory",name:"ContentPage",segment:"content",priority:"low",defaultHistory:[]},{loadChildren:"../pages/item-create/item-create.module.ngfactory#ItemCreatePageModuleNgFactory",name:"ItemCreatePage",segment:"item-create",priority:"low",defaultHistory:[]},{loadChildren:"../pages/item-detail/item-detail.module.ngfactory#ItemDetailPageModuleNgFactory",name:"ItemDetailPage",segment:"item-detail",priority:"low",defaultHistory:[]},{loadChildren:"../pages/laundry/laundry.module.ngfactory#LaundryPageModuleNgFactory",name:"LaundryPage",segment:"laundry",priority:"low",defaultHistory:[]},{loadChildren:"../pages/list-master/list-master.module.ngfactory#ListMasterPageModuleNgFactory",name:"ListMasterPage",segment:"list-master",priority:"low",defaultHistory:[]},{loadChildren:"../pages/login/login.module.ngfactory#LoginPageModuleNgFactory",name:"LoginPage",segment:"login",priority:"low",defaultHistory:[]},{loadChildren:"../pages/menu/menu.module.ngfactory#MenuPageModuleNgFactory",name:"MenuPage",segment:"menu",priority:"low",defaultHistory:[]},{loadChildren:"../pages/rental-detail/rental-detail.module.ngfactory#RentalDetailPageModuleNgFactory",name:"RentalDetailPage",segment:"rental/:id",priority:"low",defaultHistory:[]},{loadChildren:"../pages/rentals/rentals.module.ngfactory#RentalsPageModuleNgFactory",name:"RentalsPage",segment:"rentals",priority:"low",defaultHistory:[]},{loadChildren:"../pages/search/search.module.ngfactory#SearchPageModuleNgFactory",name:"SearchPage",segment:"search",priority:"low",defaultHistory:[]},{loadChildren:"../pages/settings/settings.module.ngfactory#SettingsPageModuleNgFactory",name:"SettingsPage",segment:"settings",priority:"low",defaultHistory:[]},{loadChildren:"../pages/signup/signup.module.ngfactory#SignupPageModuleNgFactory",name:"SignupPage",segment:"signup",priority:"low",defaultHistory:[]},{loadChildren:"../pages/studio/studio.module.ngfactory#StudioPageModuleNgFactory",name:"StudioPage",segment:"studio",priority:"low",defaultHistory:[]},{loadChildren:"../pages/tabs/tabs.module.ngfactory#TabsPageModuleNgFactory",name:"TabsPage",segment:"tabs",priority:"low",defaultHistory:[]},{loadChildren:"../pages/tutorial/tutorial.module.ngfactory#TutorialPageModuleNgFactory",name:"TutorialPage",segment:"tutorial",priority:"low",defaultHistory:[]},{loadChildren:"../pages/welcome/welcome.module.ngfactory#WelcomePageModuleNgFactory",name:"WelcomePage",segment:"welcome",priority:"low",defaultHistory:[]}]},[]),l._8(512,l.h,l.h,[]),l._8(512,Ae.a,Ae.a,[l.h]),l._8(1024,Fe.b,Fe.c,[Ae.a,l.o]),l._8(1024,l.c,function(e,t,n,a,r,o,l,s,u,c,p,g,d){return[i.s(e),xe.a(t),je.b(n,a),Oe.b(r,o,l,s,u),Fe.d(c,p,g,d)]},[[2,l.t],Y.a,G.a,V.a,Y.a,G.a,V.a,J.a,q.l,Y.a,Ee.a,Fe.b,l.u]),l._8(512,l.d,l.d,[[2,l.c]]),l._8(131584,l.f,l.f,[l.u,l.T,l.o,l.k,l.i,l.d]),l._8(512,l.e,l.e,[l.f]),l._8(512,i.a,i.a,[[3,i.a]]),l._8(512,s.e,s.e,[]),l._8(512,s.d,s.d,[]),l._8(512,f.a,f.a,[]),l._8(512,be.p,be.p,[]),l._8(512,be.g,be.g,[]),l._8(512,be.n,be.n,[]),l._8(512,Ne.a,Ne.a,[]),l._8(512,d.a,d.a,[]),l._8(512,S,S,[]),l._8(256,s.m,"XSRF-TOKEN",[]),l._8(256,s.n,"X-XSRF-TOKEN",[]),l._8(256,fe.c,void 0,[]),l._8(256,fe.b,void 0,[]),l._8(256,k.a,C,[]),l._8(256,ue.a,"/",[]),l._8(256,d.c,null,[])])});Object(l.M)(),Object(i.j)().bootstrapModuleFactory(Ze)}},[278]);