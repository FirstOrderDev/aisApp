import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
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
  locallyStoredCards: any;
  loader: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private storage: Storage) {
      this.cards = [];
      this.locallyStoredCards = [];

      // this.cards.push({
      //   type: "default",
      // })
      this.loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/carLoading.gif"/> <br /> <p>Gathering your roadside assistance cards...<p>`,
        cssClass: 'roadSideLoading',
      });

      this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
    console.log("Entered");
    this.storage.get('Cards').then((val) => {

      if(val){
        this.locallyStoredCards = val;
      }

    });

  }

  ionViewDidEnter(){



    console.log("Entered");
    this.storage.get("Cards").then((val) => {

      if(val){
        this.locallyStoredCards = val;
      }

      console.log(this.locallyStoredCards);

      if(this.locallyStoredCards){

        this.cards = [];

        this.locallyStoredCards.forEach((cardObject)=>{
          this.cards.push(cardObject);
        });

        this.cards.push({
          type: "default",
        })

      }else{
        this.cards.push({
          type: "default",
        })
      }

      this.loader.dismiss();
      console.log(this.cards);

    });







  }

  slideChanged(){
    console.log("Changed");
  }

  openPhotoRoadsideInput(){
    console.log("Photo input");
    this.navCtrl.push(RoadsidePhotoInputPage, {
      'Cards': this.locallyStoredCards
    });
  }

  openManualRoadsideInput(){
    console.log("Manual input");
    this.navCtrl.push(RoadsideManualInputPage, {
      'Cards': this.locallyStoredCards
    });
  }



}
