import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  firstPartyLicenseNumber: any;
  firstPartyLicenseAddress: any;
  firstPartyLicenseDOB: any;

  thirdPartyLicenseNumber: any;
  thirdPartyLicenseAddress: any;
  thirdPartyLicenseDOB: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.license = this.navParams.get('license')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseInputPage');
  }

  ionViewWillLeave() {
    if(this.license=="Your License"){
      console.log("first Party")
      this.storage.set('firstPartyLicenseInput', [this.firstPartyLicenseNumber, this.firstPartyLicenseAddress, this.firstPartyLicenseDOB])
    }
    else{
      console.log("Third Party")
      this.storage.set('thirdPartyLicenseInput', [this.thirdPartyLicenseNumber, this.thirdPartyLicenseAddress, this.thirdPartyLicenseDOB])
    }
  }

}
