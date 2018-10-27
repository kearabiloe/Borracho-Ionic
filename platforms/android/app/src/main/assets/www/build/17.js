webpackJsonp([17],{

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatDetailPageModule", function() { return ChatDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_detail__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatDetailPageModule = /** @class */ (function () {
    function ChatDetailPageModule() {
    }
    ChatDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_detail__["a" /* ChatDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_detail__["a" /* ChatDetailPage */]),
            ],
        })
    ], ChatDetailPageModule);
    return ChatDetailPageModule;
}());

//# sourceMappingURL=chat-detail.module.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatDetailPage; });
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
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatDetailPage = /** @class */ (function () {
    function ChatDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ChatDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatDetailPage');
    };
    ChatDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat-detail',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/chat-detail/chat-detail.html"*/'<!--\n  Generated template for the ChatDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Chat</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only >\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n<ion-list>\n  <ion-item>\n    <p>Left Icon Button</p>\n	<ion-avatar item-start>\n	  <img src="assets/imgs/logo.png">\n	</ion-avatar>\n  </ion-item>\n    <ion-item>\n    Left Icon Button\n	<ion-avatar item-end>\n	  <img src="assets/imgs/logo.png">\n	</ion-avatar>\n  </ion-item>\n</ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n  	<ion-textarea placeholder="Enter a description" ></ion-textarea>\n    <ion-buttons end>\n      <button ion-button icon-right color="royal">\n        Send\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/chat-detail/chat-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ChatDetailPage);
    return ChatDetailPage;
}());

//# sourceMappingURL=chat-detail.js.map

/***/ })

});
//# sourceMappingURL=17.js.map