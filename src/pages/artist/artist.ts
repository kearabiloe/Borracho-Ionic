import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
	artist:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.artist = this.navParams.get('artist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistPage');
  }

}
