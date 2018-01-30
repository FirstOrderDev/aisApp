import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RoadsidePhotoInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roadside-photo-input',
  templateUrl: 'roadside-photo-input.html',
})
export class RoadsidePhotoInputPage {

  photoTaken: any;

  cardNameInput: any;
  cardPhoneNumberInput: any;

  localCards: any;

  roadsidePhotoValid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storage: Storage) {
    this.roadsidePhotoValid = false;
    //this.photoTaken = "https://static.pexels.com/photos/207962/pexels-photo-207962.jpeg"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoadsidePhotoInputPage');
  }

  takePhoto(){
    console.log("Open Camera");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.photoTaken = base64Image;
    }, (err) => {
     // Handle error
    });

  }

  roadsidePhotoChanged(){
    if(this.photoTaken && this.cardNameInput && this.cardPhoneNumberInput){
      this.roadsidePhotoValid = true;
    }
    else{
      this.roadsidePhotoValid = false;
    }
  }

  submitPhotoCard(){
    var localCardsArray = this.navParams.get('Cards');
    localCardsArray.unshift({type: "photo", cardPhoto: this.photoTaken, cardName: this.cardNameInput, cardPhoneNumber: this.cardPhoneNumberInput});
    this.storage.set("Cards", localCardsArray);
    this.navCtrl.pop();
  }

}
