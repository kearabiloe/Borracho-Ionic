webpackJsonp([8],{

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RentalDetailPageModule", function() { return RentalDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rental_detail__ = __webpack_require__(441);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RentalDetailPageModule = /** @class */ (function () {
    function RentalDetailPageModule() {
    }
    RentalDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rental_detail__["a" /* RentalDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rental_detail__["a" /* RentalDetailPage */]),
            ],
        })
    ], RentalDetailPageModule);
    return RentalDetailPageModule;
}());

//# sourceMappingURL=rental-detail.module.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RentalDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_parse_parse__ = __webpack_require__(271);
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
 * Generated class for the RentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RentalDetailPage = /** @class */ (function () {
    function RentalDetailPage(navCtrl, navParams, parseProv) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.parseProv = parseProv;
        this.rentalProperty = navParams.get('id');
        parseProv.getRentalProperty(navParams.get('id')).then(function (response) {
            console.log(response);
            _this.rentalProperty = response.toJSON();
        });
    }
    RentalDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RentalDetailPage');
    };
    RentalDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rental-detail',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/rental-detail/rental-detail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{ rentalProperty.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<ion-card>\n  <img [src]="rentalProperty.propertyPic? rentalProperty.propertyPic : \'assets/imgs/logo.png\'"/>\n  <ion-card-content>\n    <ion-card-title>\n      R {{ rentalProperty.price }} {{ rentalProperty.billingFrequency}}\n      </ion-card-title>\n    <p>\n      {{ rentalProperty.about }}\n    </p>\n  </ion-card-content>\n  <ion-row>\n    <ion-col>\n      <button ion-button icon-left clear small>\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>12 Likes</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button icon-left clear small>\n        <ion-icon name="text"></ion-icon>\n        <div>4 Comments</div>\n      </button>\n    </ion-col>\n    <ion-col center text-center>\n      <ion-note>\n        11h ago\n      </ion-note>\n    </ion-col>\n  </ion-row>  \n</ion-card>\n<ion-card color="secondary">\n  <ion-card-header>\n    Features\n  </ion-card-header>\n  <ion-card-content>\n  <ion-list >\n    <button ion-item color="secondary">\n      <ion-icon name="shirt" item-start></ion-icon>\n      Laundry\n    </button>\n\n    <button ion-item color="secondary">\n      <ion-icon name="wifi" item-start></ion-icon>\n      Internet\n    </button>\n\n    <button ion-item color="secondary">\n      <ion-icon name="beer" item-start></ion-icon>\n      Pub\n    </button>\n\n    <button ion-item color="secondary">\n      <ion-icon name="planet" item-start></ion-icon>\n      Space\n    </button>\n\n  </ion-list>\n</ion-card-content>\n</ion-card>\n\n\n</ion-content>'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/rental-detail/rental-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_parse_parse__["a" /* ParseProvider */]])
    ], RentalDetailPage);
    return RentalDetailPage;
}());

//# sourceMappingURL=rental-detail.js.map

/***/ })

});
//# sourceMappingURL=8.js.map