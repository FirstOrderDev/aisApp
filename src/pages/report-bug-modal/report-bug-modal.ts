import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ReportBugModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-bug-modal',
  templateUrl: 'report-bug-modal.html',
})
export class ReportBugModalPage {

bugReportValid: any;

deviceInput: any;
pageInput: any;
infoText: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private emailComposer: EmailComposer) {
      this.bugReportValid = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportBugModalPage');
  }

  bugReportChanged(){
    console.log("Changed");
    if(this.deviceInput && this.pageInput && this.infoText){
      this.bugReportValid = true;
      console.log("valid");
    }
    else{
      this.bugReportValid = false;
    }
  }

  submit(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {}
    });

    var date = new Date();

    var mail;

    mail = {
      to: 'harrison.croaker@hotmail.com',
      subject: 'Bug Report for Mobile App',
      body: '<h3>Device: <h3>' + this.deviceInput + '<br />' + '<h3>Date: <h3>' + date + '<br />' + '<h3>Page: <h3>'
      + this.pageInput + '<br />' + '<h3>Information: <h3>' + this.infoText,

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
