import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController,LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ParseProvider } from '../../providers/';
/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {
	@ViewChild('fileInput') fileInput;

	isReadyToSave: boolean;

	item: any;

	form: FormGroup;

	user: any;

	formSegment: any;


	constructor(
		public navCtrl: NavController, 
		public viewCtrl: ViewController,
		 public camera: Camera, 
		 private geolocation: Geolocation,
		 public parseProv: ParseProvider,
		 public loadingController: LoadingController,
		 public alertController:AlertController,
		 private formBuilder: FormBuilder) { 

		this.form = formBuilder.group({
			art: [],
			file: [],
			artist: [''],
			title:[],
			genre:['Hip-Hop'],
			link:['https://facebook.com/hetro_official'],
			coordinates:['0,0'],
			isListed:[true],
			isVerified:[false]
		});

		// Watch the form for changes, and
		this.form.valueChanges.subscribe((v) => {
			this.isReadyToSave = this.form.valid;
		});
	
	}


	getPicture() {
/*		if (Camera['installed']()) {
			this.camera.getPicture({
				destinationType: this.camera.DestinationType.DATA_URL,
				targetWidth: 96,
				targetHeight: 96
			}).then((data) => {
				this.form.patchValue({ 'art': 'data:image/jpg;base64,' + data });
			}, (err) => {
				alert('Unable to take photo');
			})
		} else {
			this.fileInput.nativeElement.click();
		}*/
		this.fileInput.nativeElement.click();
	}

	processWebImage(event) {
		let reader = new FileReader();
		reader.onload = (readerEvent) => {

			let imageData = (readerEvent.target as any).result;
			this.form.patchValue({ 'art': imageData });
		};

		reader.readAsDataURL(event.target.files[0]);
	}

	getProfileImageStyle() {
		return 'url(' + this.form.controls['art'].value + ')'
	}

	/**
	 * The user cancelled, so we dismiss without sending data back.
	 */


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
		this.saveProperty();
		//this.viewCtrl.dismiss(this.form.value);
	}

  cancel() {
    this.viewCtrl.dismiss();
  }	

	saveProperty(){
		let errorMessage="Unkown Error Occured";
		const loading = this.loadingController.create({
			content: 'Loading',
			duration: 2000
		});

		 loading.present();
		this.parseProv.addStudioProduct(this.form.value).then(res => {
			console.log(res);
				this.navCtrl.push('StudioPage');
				loading.dismiss();
			}, (err) => {
				console.log(err);
				const alert = this.alertController.create({
					message: err.message,
					buttons: ['OK']
				});		
				errorMessage=err.message;
				loading.dismiss();
				alert.present();
			});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishPage');
  }

}
