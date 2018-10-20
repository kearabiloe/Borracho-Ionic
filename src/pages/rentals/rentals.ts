import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

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
  tapCounter = 0;  
  agentMode = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private parseProvider:ParseProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public settings: Settings) {
    this.listProperties();
    this.settings.load().then(() => {
    this.settings.getValue('AgentMode').then((resp)=>{
      console.log("Agent Mode"+resp);
      this.agentMode = resp;
    })
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
    this.tapCounter =0; 
  }

  ionViewCanEnter(): boolean {
    return true //this.auth.authenticated();
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
    let offset = this.rentalProperties.length;
    let limit = 10;
    return this.parseProvider.getRentalProperties(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        console.log(object);
        this.rentalProperties.push(object.toJSON());
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

  addProperty() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.parseProvider.addRentalProperty(item).then(()=>{this.listProperties()});
      }
    })
    addModal.present();
  }


  deleteProperty(item) {
    //this.items.delete(item);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.rentalProperties = [];
    this.listProperties();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
