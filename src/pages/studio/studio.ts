import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';
import { NativeAudio } from '@ionic-native/native-audio';
import { MusicControls } from '@ionic-native/music-controls';
import { StudioListings } from '../../providers';
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
  borrachoStream: any ={
    "file":{
      "url":'assets/clips/sample-stream.mp3'
    },
    "id":"BPSTREAM"
  }
	spinnerMessage: any = "Updating...";
  currentSong:any=false;
  songPlaying=false;
  panelMinimised=true;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    private nativeAudio: NativeAudio,
    private musicControls: MusicControls,
  	private parseProvider:ParseProvider,
    public studioProv:StudioListings) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudioPage');
    this.listProducts();
    this.studioProducts=this.studioProv.query();
    console.log(this.studioProducts);
    this.studioSegment="artists";
  }

  public listProducts(genre:any=false): Promise<any> {
    this.showSpinner = true;
    let offset = this.studioProducts.length;
    let limit = 10;
    return this.parseProvider.listStudioProducts(offset, limit,genre).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        console.log(object);
        this.studioProducts.push(object.toJSON());
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

  playPauseTrack(track:any=false){
    console.log("Playing Borracho Stream",track);

    this.minimisePanel();

    if(this.currentSong && this.songPlaying){
      //Pause Current Song
      this.nativeAudio.stop(this.currentSong.id);
      this.nativeAudio.unload(this.currentSong.id);   
      this.songPlaying=false;   

    }

    if(track){
      //Play new track
      this.currentSong=track;
      let loader = this.loadCtrl.create({
        content: 'Fetching file...'
      });
      loader.present();      
      this.nativeAudio.preloadSimple(track.id, track.file.url ).then((resp)=>{
        loader.dismissAll();
        this.musicControls.create({
          track       : track.title || 'Borracho Studio',        // optional, default : ''
          artist      : track.artist || 'Borracho',                       // optional, default : ''
          cover       : track.artist? track.artist.url : 'assets/imgs/logo.png',      // optional, default : nothing
          // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
          //           or a remote url ('http://...', 'https://...', 'ftp://...')
          isPlaying   : true,                         // optional, default : true
          dismissable : true,                         // optional, default : false

          // hide previous/next/close buttons:
          hasPrev   : true,      // show previous button, optional, default: true
          hasNext   : true,      // show next button, optional, default: true
          hasClose  : true,       // show close button, optional, default: false

          // Android only, optional
          // text displayed in the status bar when the notification (and the ticker) are updated, optional
          ticker    : 'Now playing'+track.title,
          // All icons default to their built-in android equivalents
         // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
          playIcon: 'media_play',
          pauseIcon: 'media_pause',
          prevIcon: 'media_prev',
          nextIcon: 'media_next',
          closeIcon: 'media_close',
          notificationIcon: 'notification'
         });  

         this.musicControls.subscribe().subscribe((action) => {
             const message = JSON.parse(action).message;
                 switch(message) {
                     case 'music-controls-pause':
                         this.nativeAudio.stop(track.id);

                     case 'music-controls-play':
                         this.nativeAudio.play(track.id);
                     case 'music-controls-destroy':
                         this.nativeAudio.stop(track.id);
                         this.nativeAudio.unload(track.id);

                 }

           });

         this.musicControls.listen(); // activates the observable above

         this.musicControls.updateIsPlaying(true);   
         this.nativeAudio.play(track.id);    
         this.songPlaying=true;
      }, (error)=>{
        console.log(error);
        let toast = this.toastCtrl.create({
            message: error.message,
            duration: 3000,
            position: 'top'
          }); 
        
        toast.present();        
      }); 
    }
  }
forwardTrack(){
  const next_song=this.studioProducts[this.studioProducts.indexOf(this.currentSong)+1];
  this.playPauseTrack(next_song);
}
rewindTrack(){
  const next_song=this.studioProducts[this.studioProducts.indexOf(this.currentSong)-1];
  this.playPauseTrack(next_song);
}
  segmentChanged(ev){
    this.showSpinner = true;
    this.studioProducts=[];
    let segment=ev.value;
    this.listProducts(segment).then((resp)=>{
      console.log(resp)
    });
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

}
