webpackJsonp([4],{

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudioPageModule", function() { return StudioPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__studio__ = __webpack_require__(445);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StudioPageModule = /** @class */ (function () {
    function StudioPageModule() {
    }
    StudioPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__studio__["a" /* StudioPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__studio__["a" /* StudioPage */]),
            ],
        })
    ], StudioPageModule);
    return StudioPageModule;
}());

//# sourceMappingURL=studio.module.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudioPage; });
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
 * Generated class for the StudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StudioPage = /** @class */ (function () {
    function StudioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StudioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StudioPage');
    };
    StudioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-studio',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/studio/studio.html"*/'<!--\n  Generated template for the StudioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n  <ion-toolbar [color]="agentMode ? \'secondary\' : \'primary\'">\n    <ion-segment [(ngModel)]="rentalsSegment" [color]="agentMode ? \'primary\' : \'secondary\'">\n      <ion-segment-button value="latest"  >\n        Latest\n      </ion-segment-button>\n      <ion-segment-button value="hiphop">\n        Hip-Hop\n      </ion-segment-button>\n      <ion-segment-button value="house">\n        House\n      </ion-segment-button>\n      <ion-segment-button value="other">\n        Other\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-item-divider color="secondary">\n      Get Published!\n      <button ion-button outline  icon-left item-end>\n        <ion-icon name="add-circle" ></ion-icon>\n      Join Borracho Studio \n    </button>\n    </ion-item-divider>  \n<div [ngSwitch]="rentalsSegment">\n  <ion-list *ngSwitchCase="\'latest\'">\n    <ion-item-sliding *ngFor="let property of rentalProperties" >\n    <ion-item (click)="openProperty(property)" >\n      <ion-thumbnail item-start>\n        <img [src]="property.propertyPic ? property.propertyPic : \'assets/imgs/logo.png\'">\n      </ion-thumbnail>\n      <h2>{{ property.name }}</h2>\n      <h3>• {{ property.suburb}}</h3>\n      <small>{{ property.about }}</small>\n      <button ion-button  item-end color="primary" clear small>R{{ property.price }}</button>\n    </ion-item>\n    <ion-item-options side="right">\n      <button ion-button color="primary">\n      <ion-icon name="text"></ion-icon>\n      Text\n    </button>\n    <button ion-button color="secondary">\n      <ion-icon name="call"></ion-icon>\n      Call\n    </button>\n    </ion-item-options>\n  </ion-item-sliding>     \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'hiphop\'">\n    <ion-item-sliding>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="assets/imgs/logo.png">\n      </ion-thumbnail>\n      <h2>Appartments</h2>\n      <p>Hayao Miyazaki • 1988</p>\n    </ion-item>\n    <ion-item-options side="left">\n      <button ion-button color="primary">\n      <ion-icon name="text"></ion-icon>\n      Text\n    </button>\n    <button ion-button color="secondary">\n      <ion-icon name="call"></ion-icon>\n      Call\n    </button>\n    </ion-item-options>\n    <ion-item-options side="right">\n      <button ion-button color="primary">\n        <ion-icon name="mail"></ion-icon>\n        Email\n      </button>\n    </ion-item-options>\n  </ion-item-sliding>     \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'house\'">\n    <ion-item-sliding>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="assets/imgs/logo.png">\n      </ion-thumbnail>\n      <h2>RDP HOUSE</h2>\n      <p>Hayao Miyazaki • 1988</p>\n      <p>3:54</p>\n      <button ion-button clear item-end>Download</button>\n    </ion-item>\n    <ion-item-options side="left">\n      <button ion-button color="primary">\n      <ion-icon name="text"></ion-icon>\n      Text\n    </button>\n    <button ion-button color="secondary">\n      <ion-icon name="call"></ion-icon>\n      Call\n    </button>\n    </ion-item-options>\n    <ion-item-options side="right">\n      <button ion-button color="primary">\n        <ion-icon name="mail"></ion-icon>\n        Email\n      </button>\n    </ion-item-options>\n  </ion-item-sliding> \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'other\'">\n    <ion-item-sliding>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="assets/imgs/logo.png">\n      </ion-thumbnail>\n      <h2>RDP HOUSE</h2>\n      <p>Hayao Miyazaki • 1988</p>\n      <p>3:54</p>\n      <button ion-button clear item-end>Download</button>\n    </ion-item>\n    <ion-item-options side="left">\n      <button ion-button color="primary">\n      <ion-icon name="text"></ion-icon>\n      Text\n    </button>\n    <button ion-button color="secondary">\n      <ion-icon name="call"></ion-icon>\n      Call\n    </button>\n    </ion-item-options>\n    <ion-item-options side="right">\n      <button ion-button color="primary">\n        <ion-icon name="mail"></ion-icon>\n        Email\n      </button>\n    </ion-item-options>\n  </ion-item-sliding> \n  </ion-list>\n</div>\n</ion-content>'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/studio/studio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], StudioPage);
    return StudioPage;
}());

//# sourceMappingURL=studio.js.map

/***/ })

});
//# sourceMappingURL=4.js.map