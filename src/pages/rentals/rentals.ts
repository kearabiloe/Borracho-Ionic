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
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public settings: Settings) {
    this.settings.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
    this.tapCounter =0; 
    this.listProperties();
    this.listUserProperties();  
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
        this.rentalProperties.push(object.toJSON());
      }
      this.showSpinner = false;
      this.spinnerMessage =false;      
    }, (error) => {
      this.showSpinner = false;
      this.spinnerMessage = "We were unable to update this page. Please check your internet connectivity and tap/pull to refresh.";
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

  presentContactUs(Property) {
    let applyModal = this.modalCtrl.create('RentLeadPage',{property:Property},{showBackdrop:true});
    applyModal.onDidDismiss(applicationForm => {
      if (applicationForm) {
        console.log(applicationForm);
      let loader = this.loadCtrl.create({
        content: 'Submitting Application...'
      });
      loader.present();      
      console.log("go");  
        this.parseProvider.addRentApplication(applicationForm).then((resp)=>{
          loader.dismissAll();

          let toast = this.toastCtrl.create({
            message: "Your new application was successfuly created.",
            duration: 3000,
            position: 'top'
          });      
          
          toast.present();          
          }).catch(err =>{
            console.error(err);
            loader.dismissAll();
            let alert = this.alertCtrl.create({
              title: 'Property Rental Application Was Not Created',
              subTitle: err.message,
              buttons: ['OK']
            });  
            alert.present();              
          })
      }
    })
    applyModal.present();
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

}
