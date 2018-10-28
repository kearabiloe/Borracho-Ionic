import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../../providers';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public settings: Settings,
    public formBuilder: FormBuilder) {
  	this.property = navParams.get('property') || {};
  	this.form = formBuilder.group({
  		name: [this.options.option4],
  		contact_no: [this.options.option5, Validators.required],
  		remember_me: [true]
  	});
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });	
  }
  _buildForm() {
    let group: any = {
      name: [this.options.option4],
      contact_no: [this.options.option5],
      remember_me: [true]
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

  createLead(){
    debugger;
  }
}
