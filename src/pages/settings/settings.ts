import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { ReportBugModalPage } from '../report-bug-modal/report-bug-modal';

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
    private emailComposer: EmailComposer, private alertCtrl: AlertController, public modalCtrl: ModalController) {
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
    this.sharing.shareViaSMS('Check out this app! http://aisgroup.com.au/index.php',null)
    .then(() => {
      console.log("Message sent!");
    }).catch((error) => {
      console.log(error);
    });
  }

  reportBug() {
    console.log("start bug report");
    this.navCtrl.push(ReportBugModalPage);
  }

  sendBugReport(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {}
    });

    var date = new Date();
    //console.log(this.images);

    var mail;

    mail = {
      to: 'harrison.croaker@hotmail.com',
      subject: 'Bug Report for Mobile App',
      body: '',

      isHtml: true
    };

    this.emailComposer.open(mail).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Thank you for submitting your Bug Report! We appreciate you helping us improve our Mobile App.',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();

    });
  }


}
