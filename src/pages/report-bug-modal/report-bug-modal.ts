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
type: any;

rating: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private emailComposer: EmailComposer) {
      this.type = this.navParams.get("type");
      this.bugReportValid = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportBugModalPage');
  }

  bugReportChanged(){
    console.log("Changed");
    if(this.type=='bug'){
      if(this.deviceInput && this.pageInput && this.infoText){
        this.bugReportValid = true;
        console.log("valid");
      }
      else{
        this.bugReportValid = false;
      }
    }
    else{
      if(this.infoText && this.rating){
        this.bugReportValid = true;
        console.log("valid");
      }
      else{
        this.bugReportValid = false;
      }
    }

  }

  submit(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {}
    });

    var date = new Date();

    var mail;

    if(this.type=='bug'){
      mail = {
        to: 'firstordercontact@gmail.com',
        subject: 'Bug Report for Mobile App',
        body: '<h3>Device: <h3>' + this.deviceInput + '<br />' + '<h3>Date: <h3>' + date + '<br />' + '<h3>Page: <h3>'
        + this.pageInput + '<br />' + '<h3>Information: <h3>' + this.infoText,

        isHtml: true
      };
      try{
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
      catch{
        let alert = this.alertCtrl.create({
          title: 'Unsuccessful!',
          subTitle: 'An error occured while submitting your big report. Please ensure you have mail set up on your phone.',
          buttons: ['OK']
        });
        alert.present();
      }

    }
    else{
      mail = {
        to: 'firstordercontact@gmail.com',
        subject: 'Rating for Mobile App',
        body: '<h3>Rating: <h3>' + this.rating + '<br />' + '<h3>Date: <h3>' + date + '<br />'  + '<h3>Information: <h3>' + this.infoText,

        isHtml: true
      };

      try{
        this.emailComposer.open(mail).then(() => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Thank you for submitting your review report! We appreciate you helping us improve our Mobile App.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();

        });
      }
      catch{
        let alert = this.alertCtrl.create({
          title: 'Unsuccessful!',
          subTitle: 'An error occured while submitting your review. Please ensure you have mail set up on your phone.',
          buttons: ['OK']
        });
        alert.present();
      }

    }



  }

}
