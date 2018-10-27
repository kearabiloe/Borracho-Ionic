import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';

/**
 * Generated class for the StudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-studio',
  templateUrl: 'studio.html',
})
export class StudioPage {
	studioProducts = [];
  studioSegment = "";
	showSpinner= true;
	spinnerMessage: any = "Syncing Catalogue...";

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private parseProvider:ParseProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudioPage');
    this.listProducts();
  }

  public listProducts(): Promise<any> {
    this.showSpinner = true;
    let offset = this.studioProducts.length;
    let limit = 10;
    return this.parseProvider.listStudioProducts(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        console.log(object);
        this.studioProducts.push(object.toJSON());
      }
      this.showSpinner = false;
      this.spinnerMessage =false;      
    }, (error) => {
      this.showSpinner = false;
      this.spinnerMessage = error.message;
      console.log(error);
    });
  }

  segmentChanged(ev){
    let segment=ev.value;
    console.log(segment);
  }

  doRefresh(refresher){
    this.showSpinner=true;
    this.spinnerMessage="Loading...";
    this.listProducts();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);    this.listProducts();
  }
}
