import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  user: any;

  formSegment: any="'basic'";


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private geolocation: Geolocation,public authProv: AuthProvider) {
    this.form = formBuilder.group({
      propertyPic: [],
      name: ['Property Name'],
      price:[0],
      deposit:[0],
      period:['month'],
      manager:['Manager Name'],
      contact_no:[''],
      street_address:[''],
      suburb:[''],
      link:['https://'],
      coordinates:['0,0'],
      description:['Description'],
      segment:['Buy'],
      isListed:[true],
      isVerified:[false],
      isBusiness:[false],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.user = this.authProv.authenticated();
    console.log(this.user);    
  }

  ionViewDidLoad() {
    this.getLocation();
    this.formSegment='basic';
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'propertyPic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'propertyPic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['propertyPic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((data) => {
     this.form.patchValue({'coordinates':data.coords.longitude+","+data.coords.latitude});
    }).catch((error) => {
      console.log('Error getting location', error);
      this.form.patchValue({'coordinates':error});
    });

  let watch = this.geolocation.watchPosition();
  watch.subscribe((data) => {
   // data can be a set of coordinates, or an error (if an error occurred).
   this.form.patchValue({'coordinates':data.coords.longitude+","+data.coords.latitude});
   // data.coords.latitude
   // data.coords.longitude
  });

  }
  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
