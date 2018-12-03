import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
	wifiData:any='';
	transactions:any=[];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private hotspot: Hotspot,
  	private httpd: Httpd) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
    this.createHotspot();

  }

  createHotspot(){
  	this.hotspot.createHotspot("Borracho", "Open","").then((hotspot) => {
  		console.log(hotspot);
  		this.createHttpd();
  	});    	
  }

  createHttpd(){
  	let options: HttpdOptions = {
  		www_root: 'assets/httpd_root', // relative path to app's www directory
  		port: 8080,
  		localhost_only: false
  	};

  	this.httpd.startServer(options).subscribe((data) => {
  		console.log('Server is live');
  		this.wifiData = data;
  	});  	
  }

}
