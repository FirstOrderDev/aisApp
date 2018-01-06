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

    if(this.license=="Your License"){
      console.log("first Party");

      this.storage.get('firstPartyLicenseInput').then( (selfLicense)=> {
        if(selfLicense){
          this.firstPartyLicenseNumber = selfLicense[0];
          this.firstPartyLicenseAddress = selfLicense[1];
          this.firstPartyLicenseDOB = selfLicense[2];
        }

      });


    }
    else{
      console.log("Third Party")
      this.storage.get('thirdPartyLicenseInput').then( (otherLicense)=> {
        if(otherLicense){
          this.thirdPartyLicenseNumber = otherLicense[0];
          this.thirdPartyLicenseAddress = otherLicense[1];
          this.thirdPartyLicenseDOB = otherLicense[2];
        }
      });

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseInputPage');
  }

  ionViewWillLeave() {
    if(this.license=="Your License"){
      console.log("first Party");
      if(this.firstPartyLicenseNumber || this.firstPartyLicenseAddress || this.firstPartyLicenseDOB){
        this.storage.set('firstPartyLicenseInput', [this.firstPartyLicenseNumber, this.firstPartyLicenseAddress, this.firstPartyLicenseDOB])
      }
      else{
        this.storage.set('firstPartyLicenseInput', null);
      }

    }
    else{
      console.log("Third Party")
      if(this.thirdPartyLicenseNumber || this.thirdPartyLicenseAddress || this.thirdPartyLicenseDOB){
        this.storage.set('thirdPartyLicenseInput', [this.thirdPartyLicenseNumber, this.thirdPartyLicenseAddress, this.thirdPartyLicenseDOB])
      }
      else{
        this.storage.set('thirdPartyLicenseInput', null);
      }

    }
  }

}
