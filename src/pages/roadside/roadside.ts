import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { RoadsideManualInputPage } from '../roadside-manual-input/roadside-manual-input';
import { RoadsidePhotoInputPage } from '../roadside-photo-input/roadside-photo-input';

@IonicPage()
@Component({
  selector: 'page-roadside',
  templateUrl: 'roadside.html',
})
export class RoadsidePage {

  cards: any;
  localCards: any;



  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private storage: Storage) {
      this.cards = [];

      //this.cards = this.storage.get("Cards");
      this.storage.get('Cards').then((val) => {
        //console.log('Your pic is', val);
        this.localCards = val;

      });
      this.cards.push({
        type: "default",
      })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
  }

  slideChanged(){
    console.log("Changed");
  }

  openPhotoRoadsideInput(){
    console.log("Photo input");
    this.navCtrl.push(RoadsidePhotoInputPage);
  }

  openManualRoadsideInput(){
    console.log("Manual input");
    this.navCtrl.push(RoadsideManualInputPage);
  }



}
