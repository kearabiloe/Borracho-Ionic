import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';
/**
 * Generated class for the RentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:"rental/:id"})
@Component({
  selector: 'page-rental-detail',
  templateUrl: 'rental-detail.html',
})
export class RentalDetailPage {
	rentalProperty:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public parseProv:ParseProvider) {
  	this.rentalProperty = navParams.get('id');
  	parseProv.getRentalProperty(navParams.get('id')).then((response)=>{
  		console.log(response);
  		this.rentalProperty = response.toJSON();
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalDetailPage');
  }

}
