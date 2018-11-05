import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../../providers';
import { AuthProvider } from '../../providers/auth/auth';
//import { GpsProvider } from '../../providers/gps/gps';

/**
 * Generated class for the RentLeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent-lead',
  templateUrl: 'rent-lead.html',
})
export class RentLeadPage {
  isReadyToSave: boolean;

  settingsReady = false;

  property: any;

  form: FormGroup;	

  options: any = {};

  user: any = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public settings: Settings,
    public authProv: AuthProvider,
    public formBuilder: FormBuilder) {
  	this.property = navParams.get('property') || {};
  	this.form = formBuilder.group({
  		name: [this.user.name],
  		contact_no: [this.user.phone, Validators.required],
  		onWhatsapp: [this.user.onWhatsapp],
  	});
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });	

    //Set User
    this.user = this.authProv.currentUser();
    console.log(this.user);
  }
  _buildForm() {
    let group: any = {
      name: [this.user.name],
      contact_no: [this.user.phone],
      onWhatsapp: [this.user.onWhatsapp],
      latitude:["-1.0"],
      longitude:["2.0"],
      property:[this.property]
    };

    this.form = this.formBuilder.group(group);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RentLeadPage');
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this._buildForm();
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
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
