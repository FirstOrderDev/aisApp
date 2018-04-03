import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { ReportBugModalPage } from '../report-bug-modal/report-bug-modal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharing: SocialSharing,
    private emailComposer: EmailComposer, private alertCtrl: AlertController, public modalCtrl: ModalController, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

  facebookShare() {
    this.sharing.shareViaFacebook('Download the AIS Claims App, Iphone: http://aisgroup.com.au/index.php, Android: http://aisgroup.com.au/index.php', null,null)
    .then(() => {
      console.log ("shareViaFacebook: Success!")
    }).catch(() => {
      console.log ("shareViaFacebook: Error")
    });
  }

  smsShare() {
    this.sharing.shareViaSMS('Download the AIS Claims App, Iphone: http://aisgroup.com.au/index.php, Android: http://aisgroup.com.au/index.php',null)
    .then(() => {
      console.log("Message sent!");
    }).catch((error) => {
      console.log(error);
    });
  }

  openPrivacy(){
    const browser = this.iab.create('https://sites.google.com/site/aisclaimsprivacy/');
  }

  reportBug(clicked) {
    console.log("start bug report");
    if(clicked=='bug'){
      this.navCtrl.push(ReportBugModalPage, {type: "bug"});
    }
    else{
      this.navCtrl.push(ReportBugModalPage, {type: "feedback"});
    }
  }

}
