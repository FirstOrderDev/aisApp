import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MotorPage } from '../motor/motor';

/**
 * Generated class for the LicenseConfrimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-license-confrim',
  templateUrl: 'license-confrim.html',
})
export class LicenseConfrimPage {

  takenPicture: any;
  who: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.who = this.navParams.get('who');

    this.takenPicture = this.navParams.get('pictureTaken');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseConfrimPage');
  }

  confirm(){

    if(this.who=='self'){
      this.storage.set('pic', this.takenPicture);
    }else{
      this.storage.set('otherPic', this.takenPicture);
    }

    this.navCtrl.remove(2,1); // This will remove the 'ResultPage' from stack.
    this.navCtrl.pop();
  }

}
