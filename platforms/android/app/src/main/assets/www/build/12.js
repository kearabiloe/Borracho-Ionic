webpackJsonp([12],{

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaundryPageModule", function() { return LaundryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__laundry__ = __webpack_require__(435);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LaundryPageModule = /** @class */ (function () {
    function LaundryPageModule() {
    }
    LaundryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__laundry__["a" /* LaundryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__laundry__["a" /* LaundryPage */]),
            ],
        })
    ], LaundryPageModule);
    return LaundryPageModule;
}());

//# sourceMappingURL=laundry.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaundryPage; });
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
 * Generated class for the LaundryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LaundryPage = /** @class */ (function () {
    function LaundryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LaundryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LaundryPage');
    };
    LaundryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-laundry',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/laundry/laundry.html"*/'<!--\n  Generated template for the LaundryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">   \n    <ion-title>Borracho Laundry</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n<ion-list>\n  <ion-item-group>\n    <ion-item-divider color="secondary">\n      Laundry Orders\n      <button ion-button outline  icon-left item-end>\n        <ion-icon name="add-circle" ></ion-icon>\n      New Order\n    </button>\n    </ion-item-divider>\n    <ion-item>\n      <ion-icon name="cart" item-start></ion-icon>\n        <h2>#ABDSJA</h2>\n        <p>\n          Waiting To Be Sorted<br/>\n          <small><b>Price:</b> R70 | Mixed Load  </small>\n        </p>\n      <ion-icon name="checkbox" item-end></ion-icon>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-group>\n    <ion-item-divider color="primary">Completed</ion-item-divider>\n    <ion-item>\n      <ion-icon name="cart" item-start></ion-icon>\n        <h2>#ABDSJA</h2>\n        <p>\n          Waiting To Be Sorted<br/>\n          <small><b>Price:</b> R70 | Mixed Load  </small>\n        </p>\n      <ion-icon name="checkbox" item-end></ion-icon>\n    </ion-item>\n  </ion-item-group>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/laundry/laundry.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], LaundryPage);
    return LaundryPage;
}());

//# sourceMappingURL=laundry.js.map

/***/ })

});
//# sourceMappingURL=12.js.map