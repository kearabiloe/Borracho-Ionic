import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
          { trackId: object.objectId, assetUrl: object.file.url , albumArt: object.art? object.art.url:'assets/imgs/track-placeholder.png', artist: object.artist, album: object.album, title: object.title }
          );
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
    //this.showSpinner = true;
    //let segment=ev.value;

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
  this.cdvAudioPlayer.setOptions({ verbose: true, resetStreamOnPause: true }) 
       .then(() => { 
         this.cdvAudioPlayer.setPlaylistItems([  
           { trackId: '12345', assetUrl: 'assets/studio-listings/sample-file-1.mp3', albumArt: 'assets/studio-listings/sample-art-1.png', artist: 'Awesome', album: 'Test Files', title: 'Test 1' }
         ])  
       }).catch((err) => console.log('YourService, cdvAudioPlayer init error: ', err));  
   
     this.cdvAudioPlayer.setVolume(0.5);

     this.cdvAudioPlayer.onStatus.subscribe((status) => {  
       console.log('YourService: Got RmxAudioPlayer onStatus: ', status);  
     });   
  }

  openProductDetail(product){
    this.navCtrl.push('ProductsDetailPage', {
      id: product
    });
  }

  openArtist(profile){
    this.navCtrl.push('ArtistPage', {artist: profile});
  }  

  playTrack(track){
    this.currentSong = track;
    this.cdvAudioPlayer.playTrackById(track.objectId);
  }

}
