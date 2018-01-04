import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

  facebookShare() {
    this.sharing.shareViaFacebook('Hello world!',null,'http://aisgroup.com.au/index.php')
    .then(() => {
      console.log ("shareViaFacebook: Success!")
    }).catch(() => {
      console.log ("shareViaFacebook: Error")
    });
  }

  smsShare() {
    this.sharing.shareViaSMS('Check out this app!',null)
    .then(() => {
      console.log("Message sent!");
    }).catch((error) => {
      console.log(error);
    });
  }


}
