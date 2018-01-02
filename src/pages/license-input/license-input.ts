import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LicenseInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-license-input',
  templateUrl: 'license-input.html',
})
export class LicenseInputPage {

  license: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.license = "Your License"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseInputPage');
  }

}
