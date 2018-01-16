import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RoadsideManualInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roadside-manual-input',
  templateUrl: 'roadside-manual-input.html',
})
export class RoadsideManualInputPage {

  cardNameInput: any;
  cardMemberShipNumberInput: any;
  cardNumberInput:any;
  cardPhoneNumberInput: any;
  cardAdditionalInfoInput: any;


  localCards: any;

  roadsideManualValid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.roadsideManualValid = false;
    //this.photoTaken = "https://static.pexels.com/photos/207962/pexels-photo-207962.jpeg"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoadsidePhotoInputPage');
  }

  roadsideManualChanged(){
    console.log("Changed");
    if( this.cardNameInput && this.cardMemberShipNumberInput && this.cardNumberInput && this.cardPhoneNumberInput ){
      this.roadsideManualValid = true;
    }
    else{
      this.roadsideManualValid = false;
    }
  }

  submitManualCard(){
    var localCardsArray = this.navParams.get('Cards');
    if(this.cardAdditionalInfoInput){
      localCardsArray.unshift({type: "manual", cardName: this.cardNameInput, cardMemberShipNumber: this.cardMemberShipNumberInput, cardNumber: this.cardNumberInput, cardPhoneNumber: this.cardPhoneNumberInput, cardAdditionalInfo: this.cardAdditionalInfoInput});
    }
    else{
      localCardsArray.unshift({type: "manual", cardName: this.cardNameInput, cardMemberShipNumber: this.cardMemberShipNumberInput, cardNumber: this.cardNumberInput, cardPhoneNumber: this.cardPhoneNumberInput, cardAdditionalInfo: null});
    }
    this.storage.set("Cards", localCardsArray);
    this.navCtrl.pop();
  }



}
