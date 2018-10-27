webpackJsonp([16],{

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatsPageModule", function() { return ChatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chats__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatsPageModule = /** @class */ (function () {
    function ChatsPageModule() {
    }
    ChatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */]),
            ],
        })
    ], ChatsPageModule);
    return ChatsPageModule;
}());

//# sourceMappingURL=chats.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatsSegment = 'chats';
    }
    ChatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatsPage');
    };
    ChatsPage.prototype.openChatDetail = function (chat) {
        this.navCtrl.push('ChatDetailPage', {
            id: chat
        });
    };
    ChatsPage.prototype.openProfile = function (profile) {
        this.navCtrl.push('ProfilePage', { id: profile });
    };
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/chats/chats.html"*/'<!--\n  Generated template for the ChatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n	<ion-toolbar color="primary">\n		<ion-searchbar (input)="getItems($event)"></ion-searchbar>      \n	</ion-toolbar>\n\n</ion-header>\n\n\n<ion-content >\n	\n  <ion-segment [(ngModel)]="chatsSegment" color="primary">\n    <ion-segment-button value="chats">\n      Chats\n    </ion-segment-button>\n    <ion-segment-button value="contacts">\n      Contacts\n    </ion-segment-button>\n  </ion-segment>\n\n\n<div [ngSwitch]="chatsSegment">\n  <ion-list *ngSwitchCase="\'chats\'">\n	  <ion-item-sliding>\n	    <ion-item (click)="openChatDetail(1)">\n	      <ion-avatar item-start>\n	        <img src="assets/imgs/logo.png">\n	      </ion-avatar>\n	      <h2>Laundry</h2>\n	      <p>Pick Up Confirmations</p>\n	    </ion-item>\n	    <ion-item-options side="left">\n	      <button ion-button color="primary">\n	        <ion-icon name="text"></ion-icon>\n	        Text\n	      </button>\n	      <button ion-button color="secondary">\n	        <ion-icon name="call"></ion-icon>\n	        Call\n	      </button>\n	    </ion-item-options>\n	    <ion-item-options side="right">\n	      <button ion-button color="primary">\n	        <ion-icon name="mail"></ion-icon>\n	        Email\n	      </button>\n	    </ion-item-options>\n	  </ion-item-sliding>\n	</ion-list>\n\n\n  <ion-list *ngSwitchCase="\'contacts\'">\n  	<ion-item-sliding>\n	  <ion-item>\n	    <ion-thumbnail item-start (click)="openProfile(1)">\n	      <img src="assets/imgs/logo.png">\n	    </ion-thumbnail>\n	    <h2>RDP HOUSE</h2>\n	    <p>Hayao Miyazaki • 1988</p>\n	    <button ion-button icon-left item-end color="secondary" (click)="openChatDetail(1)">\n	    	<ion-icon name="text"></ion-icon>\n			Chat\n		</button>\n	  </ion-item>\n	  <ion-item-options side="left">\n	  	<button ion-button color="primary">\n			<ion-icon name="text"></ion-icon>\n			Text\n		</button>\n		<button ion-button color="secondary">\n			<ion-icon name="call"></ion-icon>\n			Call\n		</button>\n		</ion-item-options>\n		<ion-item-options side="right">\n			<button ion-button color="primary">\n				<ion-icon name="mail"></ion-icon>\n				Email\n			</button>\n		</ion-item-options>\n	</ion-item-sliding>	\n  </ion-list>\n</div>	\n\n</ion-content>\n'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/chats/chats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ })

});
//# sourceMappingURL=16.js.map