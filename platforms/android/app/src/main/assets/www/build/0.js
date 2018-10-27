webpackJsonp([0],{

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RentalsPageModule", function() { return RentalsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rentals__ = __webpack_require__(439);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RentalsPageModule = /** @class */ (function () {
    function RentalsPageModule() {
    }
    RentalsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rentals__["a" /* RentalsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rentals__["a" /* RentalsPage */]),
            ],
        })
    ], RentalsPageModule);
    return RentalsPageModule;
}());

//# sourceMappingURL=rentals.module.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RentalsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_parse_parse__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_settings_settings__ = __webpack_require__(273);
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
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


var RentalsPage = /** @class */ (function () {
    function RentalsPage(navCtrl, navParams, parseProvider, geolocation, modalCtrl, alertCtrl, settings) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.parseProvider = parseProvider;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.settings = settings;
        this.listedRentals = { "appartments": {}, "houses": {} };
        this.rentalsSegment = "all";
        this.newProperty = { name: null, price: null, address: null };
        this.rentalProperties = [];
        this.tapCounter = 0;
        this.agentMode = false;
        this.listProperties();
        this.settings.load().then(function () {
            _this.settings.getValue('AgentMode').then(function (resp) {
                console.log("Agent Mode" + resp);
                _this.agentMode = resp;
            });
        });
        this.getLocation();
    }
    RentalsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RentalsPage');
        this.tapCounter = 0;
    };
    RentalsPage.prototype.ionViewCanEnter = function () {
        return true; //this.auth.authenticated();
    };
    RentalsPage.prototype.tapHome = function (tap) {
        //Secret Door: Activates Agents Mode.
        console.log("tapped home " + this.tapCounter + " times");
        if (this.tapCounter >= 10) {
            if (this.agentMode) {
                //Deactivate Agent Mode
                this.agentMode = false;
                var alert_1 = this.alertCtrl.create({
                    title: 'Toggle Agent Mode',
                    subTitle: 'Agent Mode Deactivated',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                //Activate Agent Mode
                this.agentMode = true;
                var alert_2 = this.alertCtrl.create({
                    title: 'Toggle Agent Mode',
                    subTitle: 'Agent Mode Activated',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            this.tapCounter = 0;
            this.settings.setValue('AgentMode', this.agentMode);
        }
        else {
            this.tapCounter++;
        }
    };
    RentalsPage.prototype.listProperties = function () {
        var _this = this;
        var offset = this.rentalProperties.length;
        var limit = 10;
        return this.parseProvider.getRentalProperties(offset, limit).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var object = result[i];
                console.log(object);
                _this.rentalProperties.push(object.toJSON());
            }
        }, function (error) {
            console.log(error);
        });
    };
    RentalsPage.prototype.openChats = function () {
        console.log('OpenChats Clicked');
        this.navCtrl.push('ChatsPage');
    };
    RentalsPage.prototype.openProperty = function (rental) {
        console.log(rental);
        this.navCtrl.push('RentalDetailPage', { id: rental.objectId });
    };
    RentalsPage.prototype.addProperty = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('ItemCreatePage');
        addModal.onDidDismiss(function (item) {
            if (item) {
                console.log(item);
                _this.parseProvider.addRentalProperty(item).then(function () { _this.listProperties(); });
            }
        });
        addModal.present();
    };
    RentalsPage.prototype.deleteProperty = function (item) {
        //this.items.delete(item);
    };
    RentalsPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.rentalProperties = [];
        this.listProperties();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    RentalsPage.prototype.getLocation = function () {
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            console.log(data);
            // data.coords.latitude
            // data.coords.longitude
        });
    };
    RentalsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rentals',template:/*ion-inline-start:"/home/droog/Workspace/Borracho/src/pages/rentals/rentals.html"*/'<!--\n  Generated template for the RentalsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n     	\n  <ion-toolbar [color]="agentMode ? \'secondary\' : \'primary\'">\n	<ion-segment [(ngModel)]="rentalsSegment" [color]="agentMode ? \'primary\' : \'secondary\'">\n		<ion-segment-button value="all"  >\n		  All\n		</ion-segment-button>\n		<ion-segment-button value="appartments">\n		  My Properties\n		</ion-segment-button>\n	</ion-segment>\n\n    <ion-buttons end>\n      <button ion-button icon-only menuToggle (tap)="tapHome($event)">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content >\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Pull to refresh"\n      refreshingSpinner="circles"\n      refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>	\n\n<div [ngSwitch]="rentalsSegment">\n  <ion-list *ngSwitchCase="\'all\'">\n    <ion-item-divider color="secondary">\n      Looking For Property?\n      <button ion-button outline  icon-left item-end >\n        <ion-icon name="chatbubbles" ></ion-icon>\n      Chat With Agent\n    </button>\n    </ion-item-divider>    	\n  	<ion-item-sliding *ngFor="let property of rentalProperties" >\n	  <ion-item (click)="openProperty(property)" >\n	    <ion-thumbnail item-start>\n	      <img [src]="property.propertyPic ? property.propertyPic : \'assets/imgs/logo.png\'">\n	    </ion-thumbnail>\n	    <h2>{{ property.name }}</h2>\n	    <h3>• {{ property.suburb}}</h3>\n	    <small>{{ property.about }}</small>\n	    <button ion-button  item-end color="primary" clear small>R{{ property.price }}</button>\n	  </ion-item>\n	  <ion-item-options side="right">\n	  	<button ion-button color="primary">\n			<ion-icon name="text"></ion-icon>\n			Text\n		</button>\n		<button ion-button color="secondary">\n			<ion-icon name="call"></ion-icon>\n			Call\n		</button>\n		</ion-item-options>\n	</ion-item-sliding>		  \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'appartments\'">\n    <ion-item-divider color="secondary">\n      Looking For Tenants?\n      <button ion-button outline  icon-left item-end (click)="addProperty()">\n        <ion-icon name="add-circle" ></ion-icon>\n      Add Property\n    </button>\n    </ion-item-divider>  	\n  	<ion-item-sliding>\n	  <ion-item>\n	    <ion-thumbnail item-start>\n	      <img src="assets/imgs/logo.png">\n	    </ion-thumbnail>\n	    <h2>Appartments</h2>\n	    <p>Hayao Miyazaki • 1988</p>\n	  </ion-item>\n	  <ion-item-options side="left">\n	  	<button ion-button color="primary">\n			<ion-icon name="text"></ion-icon>\n			Text\n		</button>\n		<button ion-button color="secondary">\n			<ion-icon name="call"></ion-icon>\n			Call\n		</button>\n		</ion-item-options>\n		<ion-item-options side="right">\n			<button ion-button color="primary">\n				<ion-icon name="mail"></ion-icon>\n				Email\n			</button>\n		</ion-item-options>\n	</ion-item-sliding>		  \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'houses\'">\n  	<ion-item-sliding>\n	  <ion-item>\n	    <ion-thumbnail item-start>\n	      <img src="assets/imgs/logo.png">\n	    </ion-thumbnail>\n	    <h2>RDP HOUSE</h2>\n	    <p>Hayao Miyazaki • 1988</p>\n	    <button ion-button  item-end color="secondary">View</button>\n	  </ion-item>\n	  <ion-item-options side="left">\n	  	<button ion-button color="primary">\n			<ion-icon name="text"></ion-icon>\n			Text\n		</button>\n		<button ion-button color="secondary">\n			<ion-icon name="call"></ion-icon>\n			Call\n		</button>\n		</ion-item-options>\n		<ion-item-options side="right">\n			<button ion-button color="primary">\n				<ion-icon name="mail"></ion-icon>\n				Email\n			</button>\n		</ion-item-options>\n	</ion-item-sliding>	\n  </ion-list>\n</div>\n\n  <ion-fab right bottom *ngIf="agentMode">\n    <button ion-fab [color]="agentMode ? \'secondary\' : \'primary\'"><ion-icon name="add"></ion-icon></button>\n    <ion-fab-list side="left">\n      <button ion-fab><ion-icon name="person-add"></ion-icon></button>\n      <button ion-fab   (click)="addProperty()"><ion-icon name="home"></ion-icon></button>\n    </ion-fab-list>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/droog/Workspace/Borracho/src/pages/rentals/rentals.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_parse_parse__["a" /* ParseProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_settings_settings__["a" /* Settings */]])
    ], RentalsPage);
    return RentalsPage;
}());

//# sourceMappingURL=rentals.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Geolocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @name Geolocation
 * @description
 * This plugin provides information about the device's location, such as latitude and longitude. Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs.
 *
 *  This API is based on the W3C Geolocation API Specification, and only executes on devices that don't already provide an implementation.
 *
 * For iOS you have to add this configuration to your configuration.xml file
 * ```xml
 * <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
 *    <string>We use your location for full functionality of certain app features.</string>
 * </edit-config>
 * ```
 *
 *
 * @usage
 *
 * ```typescript
 * import { Geolocation } from '@ionic-native/geolocation';
 *
 * ...
 *
 * constructor(private geolocation: Geolocation) {}
 *
 * ...
 *
 * this.geolocation.getCurrentPosition().then((resp) => {
 *  // resp.coords.latitude
 *  // resp.coords.longitude
 * }).catch((error) => {
 *   console.log('Error getting location', error);
 * });
 *
 * let watch = this.geolocation.watchPosition();
 * watch.subscribe((data) => {
 *  // data can be a set of coordinates, or an error (if an error occurred).
 *  // data.coords.latitude
 *  // data.coords.longitude
 * });
 * ```
 * @interfaces
 * Coordinates
 * Geoposition
 * PositionError
 * GeolocationOptions
 */
var Geolocation = (function (_super) {
    __extends(Geolocation, _super);
    function Geolocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the device's current position.
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
     */
    /**
       * Get the device's current position.
       *
       * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
       * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
       */
    Geolocation.prototype.getCurrentPosition = /**
       * Get the device's current position.
       *
       * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
       * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
       */
    function (options) {
        return;
    };
    /**
     * Watch the current device's position.  Clear the watch by unsubscribing from
     * Observable changes.
     *
     * ```typescript
     * const subscription = this.geolocation.watchPosition()
     *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
     *                               .subscribe(position => {
     *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
     * });
     *
     * // To stop notifications
     * subscription.unsubscribe();
     * ```
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
     */
    /**
       * Watch the current device's position.  Clear the watch by unsubscribing from
       * Observable changes.
       *
       * ```typescript
       * const subscription = this.geolocation.watchPosition()
       *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
       *                               .subscribe(position => {
       *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
       * });
       *
       * // To stop notifications
       * subscription.unsubscribe();
       * ```
       *
       * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
       * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
       */
    Geolocation.prototype.watchPosition = /**
       * Watch the current device's position.  Clear the watch by unsubscribing from
       * Observable changes.
       *
       * ```typescript
       * const subscription = this.geolocation.watchPosition()
       *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
       *                               .subscribe(position => {
       *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
       * });
       *
       * // To stop notifications
       * subscription.unsubscribe();
       * ```
       *
       * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
       * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
       */
    function (options) {
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var watchId = navigator.geolocation.watchPosition(observer.next.bind(observer), observer.next.bind(observer), options);
            return function () { return navigator.geolocation.clearWatch(watchId); };
        });
    };
    Geolocation.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */] },
    ];
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])({
            callbackOrder: 'reverse'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Geolocation.prototype, "getCurrentPosition", null);
    /**
     * @name Geolocation
     * @description
     * This plugin provides information about the device's location, such as latitude and longitude. Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs.
     *
     *  This API is based on the W3C Geolocation API Specification, and only executes on devices that don't already provide an implementation.
     *
     * For iOS you have to add this configuration to your configuration.xml file
     * ```xml
     * <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
     *    <string>We use your location for full functionality of certain app features.</string>
     * </edit-config>
     * ```
     *
     *
     * @usage
     *
     * ```typescript
     * import { Geolocation } from '@ionic-native/geolocation';
     *
     * ...
     *
     * constructor(private geolocation: Geolocation) {}
     *
     * ...
     *
     * this.geolocation.getCurrentPosition().then((resp) => {
     *  // resp.coords.latitude
     *  // resp.coords.longitude
     * }).catch((error) => {
     *   console.log('Error getting location', error);
     * });
     *
     * let watch = this.geolocation.watchPosition();
     * watch.subscribe((data) => {
     *  // data can be a set of coordinates, or an error (if an error occurred).
     *  // data.coords.latitude
     *  // data.coords.longitude
     * });
     * ```
     * @interfaces
     * Coordinates
     * Geoposition
     * PositionError
     * GeolocationOptions
     */
    Geolocation = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["e" /* Plugin */])({
            pluginName: 'Geolocation',
            plugin: 'cordova-plugin-geolocation',
            pluginRef: 'navigator.geolocation',
            repo: 'https://github.com/apache/cordova-plugin-geolocation',
            install: 'ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"',
            installVariables: ['GEOLOCATION_USAGE_DESCRIPTION'],
            platforms: ['Amazon Fire OS', 'Android', 'Browser', 'iOS', 'Windows']
        })
    ], Geolocation);
    return Geolocation;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=0.js.map