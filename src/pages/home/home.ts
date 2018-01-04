import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MotorPage } from '../motor/motor';
import { TravelPage } from '../travel/travel';
import { PropertyPage } from '../property/property';
import { SettingsPage } from '../settings/settings';
import { RoadsidePage } from '../roadside/roadside';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, public plt: Platform) {



  }

  open(cardTapped){

    this.cameraPreview.stopCamera();

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



}
