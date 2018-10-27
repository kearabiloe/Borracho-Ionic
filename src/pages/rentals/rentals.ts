import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ParseProvider } from '../../providers/parse/parse';
import { Settings } from '../../providers/settings/settings';

@IonicPage({segment:"rentals"})
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {
	listedRentals: any={"appartments":{},"houses":{}};
	rentalsSegment: string="all";
  newProperty = { name: null, price: null, address: null };
  rentalProperties = [];
  userProperties = [];
  tapCounter = 0;  
  agentMode = false;
  showSpinner= true;
  spinnerMessage: any = "Loading...";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private parseProvider:ParseProvider,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public settings: Settings) {
    this.settings.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
    this.tapCounter =0; 
    this.listProperties();
    this.listUserProperties();
    this.getLocation();    
  }

  ionViewCanEnter(): boolean {
    return true //this.auth.authenticated();
  }
  ionViewWillEnter() {
  
      this.settings.getValue('option1').then((resp)=>{
        console.log("Agent Mode: "+resp);
        this.agentMode = resp;
        });
  }
  tapHome(tap){
    //Secret Door: Activates Agents Mode.
    console.log("tapped home "+this.tapCounter+" times");
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
        console.log(object);
        this.rentalProperties.push(object.toJSON());
      }
      this.showSpinner = false;
      this.spinnerMessage =false;      
    }, (error) => {
      this.showSpinner = false;
      this.spinnerMessage = error.message;
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

  openProperty(rental){
    console.log(rental);
    this.navCtrl.push('RentalDetailPage', {id: rental.objectId})
  }  

  presentContactUs(myEvent) {
    let popover = this.popoverCtrl.create('SignupPage',{},{showBackdrop:true});
    popover.present({
      ev: myEvent
    });
  }  

  presentSettings(myEvent) {
    let popover = this.popoverCtrl.create('SettingsPage',{},{showBackdrop:true});
    popover.present({
      ev: myEvent
    });
  }  

  addProperty() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.parseProvider.addRentalProperty(item).then(()=>{this.doRefresh()});
      }
    })
    addModal.present();
  }


  deleteProperty(item) {
    //this.items.delete(item);
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

  getLocation(){
this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});

  }

}
