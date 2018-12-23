import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController,ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { ParseProvider } from '../../providers/parse/parse';
import { Settings } from '../../providers/settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { MarketListings } from '../../providers';

@IonicPage({segment:"rentals"})
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {
	listedRentals: any={"appartments":{},"houses":{}};
	marketSegment: any="rent";
  newProperty = { name: null, price: null, address: null };
  rentalProperties = [];
  userProperties = [];
  searchResults = [];
  searchbarVisible = false;
  featuredListings = [];
  tapCounter = 0;
  agentMode = false;
  showSpinner= true;
  spinnerMessage: any = "Loading...";
  user: any ={"name":"Guest"};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private parseProvider:ParseProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public marketListings: MarketListings,
    public authProv: AuthProvider,
    public settings: Settings) {
    this.settings.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
    this.tapCounter =0;
    this.listProperties();
    this.listUserProperties();
    this.user=this.authProv.currentUser();
  }

  ionViewCanEnter(): boolean {
    return true //this.authProv.authenticated();
  }
  ionViewWillEnter() {
    this.searchResults=this.marketListings.query({'segment':this.marketSegment});

  }
  tapHome(tap){
    //Secret Door: Activates Agents Mode.
    if(this.tapCounter >= 10){
      if(this.agentMode){
        //Deactivate Agent Mode
        this.agentMode = false;
        let alert = this.alertCtrl.create({
          title: 'Toggle Agent Mode',
          subTitle: 'Agent Mode Deactivated',
          buttons: ['OK']
        });
        alert.present();

      }else{
        //Activate Agent Mode
        this.agentMode = true;
        let alert = this.alertCtrl.create({
          title: 'Toggle Agent Mode',
          subTitle: 'Agent Mode Activated',
          buttons: ['OK']
        });
        alert.present();

      }
      this.tapCounter =0;
      this.settings.setValue('AgentMode',this.agentMode);

    }else{
      this.tapCounter++
    }
  }

  public listProperties(): Promise<any> {
    this.showSpinner = true;
    let offset = this.rentalProperties.length;
    let limit = 10;
    return this.parseProvider.getRentalProperties(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        //this.rentalProperties.push(object.toJSON());
        this.marketListings.add(object.toJSON());
      }
      this.showSpinner = false;
      this.spinnerMessage =false;
    }, (error) => {
      this.rentalProperties = this.marketListings.query({'segment':this.marketSegment});
      this.showSpinner = false;
      this.spinnerMessage = "We were unable to fetch latest results. Please check your internet connection and pull down to refresh.";
      console.log(error);
    });
  }


  public listUserProperties(): Promise<any> {
    let offset = this.rentalProperties.length;
    let limit = 10;
    return this.parseProvider.getUserProperties(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.userProperties.push(object.toJSON());
      }
    }, (error) => {
      console.log(error);
    });
  }



  openChats(){
  	console.log('OpenChats Clicked');
  	this.navCtrl.push('ChatsPage')
  }

  toggleSearch(ev: any){
    if(this.searchbarVisible){
      this.searchbarVisible =  false;
    }else{
      this.searchbarVisible =  true;
    }

  }

  openProperty(rental){
    console.log(rental);
    this.navCtrl.push('RentalDetailPage', {property: rental})
  }


  presentSettings(myEvent) {
    let popover = this.modalCtrl.create('SettingsPage',{},{showBackdrop:true});
    popover.present({
      ev: myEvent
    });
  }

  addProperty() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
      let loader = this.loadCtrl.create({
        content: 'Creating Property...'
      });
      loader.present();
      this.marketListings.add(item);
        this.parseProvider.addRentalProperty(item).then((resp)=>{
          loader.dismissAll();
          let toast = this.toastCtrl.create({
            message: "Your new property was successfuly created.",
            duration: 3000,
            position: 'top'
          });

          toast.present();
          this.doRefresh()}).catch(err =>{
            console.error(err);
            loader.dismissAll();
            let alert = this.alertCtrl.create({
              title: 'Property Not Created',
              subTitle: err.message,
              buttons: ['OK']
            });
            alert.present();
          })
      }
    })
    addModal.present();
  }


  deleteProperty(property) {
    this.parseProvider.deleteRentalProperty(property).then((resp)=>{
      let toast = this.toastCtrl.create({
        message: "Your property was successfuly deleted.",
        duration: 3000,
        position: 'top'
      });

      toast.present();
      this.doRefresh()}).catch(err =>{
        console.error(err);
        let alert = this.alertCtrl.create({
          title: 'Property Not Deleted',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  doRefresh(refresher:any=false) {
    this.showSpinner=true;
    this.spinnerMessage="Loading...";
    this.rentalProperties = [];
    this.userProperties = [];
    this.listProperties();
    this.listUserProperties();

    setTimeout(() => {
      if(refresher){
        refresher.complete();
      }
    }, 2000);
  }

  getSearch(ev: any) {
    // Reset marketPartners back to all of the marketPartners
    //this.listMarketPartners();
    console.log(this.rentalProperties);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the marketPartners
    if (val && val.trim() != '') {
      this.searchResults = this.rentalProperties.filter((item) => {
        if(item.segment == this.marketSegment){
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }

      })
    }
  }

  segmentChanged(ev: any){
    // Reset marketPartners back to all of the marketPartners
    //this.listProperties();


    // set val to the value of the searchbar
    let val = ev.value.toString();
    console.log(val);
    if(val =="managed"){
      //this.listUserProperties();
      return this.searchResults=this.userProperties;
    }
    this.rentalProperties = this.marketListings.query({'segment':this.marketSegment});
    // if the value is an empty string don't filter the marketPartners
    if (val && val.trim() != '') {
      this.searchResults = this.rentalProperties.filter((item) => {
        return (item.segment.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
