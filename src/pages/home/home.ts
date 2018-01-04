import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MotorPage } from '../motor/motor';
import { TravelPage } from '../travel/travel';
import { PropertyPage } from '../property/property';
import { SettingsPage } from '../settings/settings';
import { RoadsidePage } from '../roadside/roadside';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public plt: Platform, private camera: Camera) {



  }

  open(cardTapped){

    if(cardTapped=='Motor'){
      this.navCtrl.push(MotorPage);
    }
    else if(cardTapped=='Travel'){
      this.navCtrl.push(TravelPage);
    }
    else if(cardTapped=='Property'){
      this.navCtrl.push(PropertyPage);
    }
    else if(cardTapped=='Settings'){
      this.navCtrl.push(SettingsPage);
    }
    else if(cardTapped=='Roadside'){
      this.navCtrl.push(RoadsidePage);
    }
    else if(cardTapped=='camera'){

    }



  }

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;




     //this.images.push(base64Image);
    }, (err) => {
     // Handle error
    });
  }


}
