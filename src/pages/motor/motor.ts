import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MotorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-motor',
  templateUrl: 'motor.html',
})
export class MotorPage {

  policyInput: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
  }

  nextFromOne() {
    this.slides.slideNext();

    console.log(this.policyInput)
  }

  lastFromOne(){
    this.slides.slidePrev();

    console.log(this.policyInput)
  }

  cancel(){
    this.navCtrl.pop();
  }

  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }

}
