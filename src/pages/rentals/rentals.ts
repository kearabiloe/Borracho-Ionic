import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage({segment:"rentals"})
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {
	listedRentals: any={"appartments":{},"houses":{}};
	rentalsSegment: string="all"

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
  }

  openChats(){
  	console.log('OpenChats Clicked');
  	this.navCtrl.push('ChatsPage')
  }

  openRental(rental){
    console.log(rental);
    this.navCtrl.push('RentalDetailPage', {id: rental})
  }  
}
