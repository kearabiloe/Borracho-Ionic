import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController,ActionSheetController } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';
import { StudioListings } from '../../providers';
import { CordovaAudioPlayerService } from '../../providers';
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
	studioProducts:any = [];
  userProducts:any = [];
  studioSegment = "";
	showSpinner= true;
	spinnerMessage: any = "Updating...";
  currentSong:any=false;
  songPlaying=false;
  panelMinimised=true;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private cdvAudioPlayer: CordovaAudioPlayerService,
  	private parseProvider:ParseProvider,
    public studioProv:StudioListings) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudioPage');
    this.listProducts();
    this.studioProducts=this.studioProv.query();
    this.studioSegment="tracks";
    this.initPlaylist();
  }

  public listProducts(genre:any=false): Promise<any> {
    this.showSpinner = true;
    let offset = this.studioProducts.length;
    let limit = 10;
    return this.parseProvider.listStudioProducts(offset, limit,genre).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i].toJSON();
        this.studioProducts.push(object);
        this.cdvAudioPlayer.addItem(
          { 
            trackId: object.objectId, 
            assetUrl: object.file.url, 
            albumArt: object.art? object.art.url:'assets/imgs/track-placeholder.png', 
            artist: object.artist, 
            album: object.album, 
            title: object.title,
            isStream: true
          });
      }
      this.showSpinner = false;
      this.spinnerMessage =false;      
    }, (error) => {
      this.studioProducts=this.studioProv.query();
      this.showSpinner = false;
      this.spinnerMessage = "We were unable to fetch latest results. Please check your internet connection and pull down to refresh.";
      console.log(error);
    });
  }


  segmentChanged(ev){
    this.showSpinner = true;
    let segment=ev.value;
    if(segment =="published"){
      this.parseProvider.getUserProducts().then(
        (result) =>{
          this.userProducts=[];
          for (let i = 0; i < result.length; i++) {
            let object = result[i].toJSON();
            this.userProducts.push(object);
          }
        },
        (error)=>{
          console.log(error);
        })
    }

  }

  minimisePanel(){
    this.panelMinimised = this.panelMinimised? false:true;

    if(!this.panelMinimised){
      setTimeout(() => {
        this.panelMinimised=true;
      }, 10000);
    }
  }

  doRefresh(refresher){
    this.studioProducts =[];
    this.showSpinner=true;
    this.spinnerMessage="Loading...";
    this.listProducts();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  initPlaylist(){
  this.cdvAudioPlayer.setOptions({ verbose: true, resetStreamOnPause: false }) 
 
     this.cdvAudioPlayer.setVolume(1);

  }

  openProductDetail(product){
    this.navCtrl.push('ProductsDetailPage', {
      id: product
    });
  }

  openArtist(profile){
    this.navCtrl.push('ArtistPage', {artist: profile});
/*    let profileModal = this.modalCtrl.create('LoginPage', {artist: profile});
       profileModal.present();  */  
  }  

  openPublishModal(){
    let profileModal = this.modalCtrl.create('PublishPage');
       profileModal.present();   
  }

  playTrack(track){
    this.cdvAudioPlayer.playTrackById(track.objectId);
    this.currentSong = this.cdvAudioPlayer.currentTrack;
  }

 presentActionSheet(track) {
   let actionSheet = this.actionSheetCtrl.create({
     title: track.title+" By "+track.artist,
     buttons: [
       {
         text: 'Follow ',
         icon: 'logo-facebook',
         role: 'destructive',
         handler: () => {this.openArtist(track)}
       },
       {
         text: 'Play Now',
         icon: 'play',
         handler: () => {this.playTrack(track)}
       },
       {
         text: 'Cancel',
         role: 'cancel',
         icon: 'close',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }  

}
