import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ParseProvider } from '../../providers/parse/parse';
/**
 * Generated class for the MarketplacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marketplace',
  templateUrl: 'marketplace.html',
})
export class MarketplacePage {
	searchQuery: string = '';
	marketPartners: any = [];
  searchResults: any = [];
  defaultPartners: any =[1,2,3];


  constructor(public navCtrl: NavController, public navParams: NavParams, public parseProvider:ParseProvider) {
  }



  getmarketPartners(ev: any) {
    // Reset marketPartners back to all of the marketPartners
    //this.listMarketPartners();
    console.log(this.marketPartners);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the marketPartners
    if (val && val.trim() != '') {
      this.searchResults = this.marketPartners.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public listMarketPartners(): Promise<any> {
  let offset = this.marketPartners.length;
  let limit = 10;
  return this.parseProvider.getMarketPartners(offset, limit).then((result) => {
    for (let i = 0; i < result.length; i++) {
      let object = result[i];
      this.marketPartners.push(object.toJSON());
    }
    console.log(this.marketPartners);
  }, (error) => {
    console.log(error);
  });
}

  doRefresh(refresher:any=false) {
    this.listMarketPartners();

    setTimeout(() => {
      if(refresher){
        refresher.complete();
      }
    }, 2000);
  }


  openPartner(partner){
    console.log(partner);
    this.navCtrl.push('MarketDetailPage', {id: partner.objectId})
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketplacePage');
    this.listMarketPartners();
    this.searchResults = this.marketPartners;
  }

}
