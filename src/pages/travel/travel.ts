import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the TravelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travel',
  templateUrl: 'travel.html',
})
export class TravelPage {

  currentCard: number;

  //card 1
  policyInput: any;
  nameInput: any;
  numberInput: any;

  policy_input: any;
  name_input: any;
  number_input: any;

  //card 2
  myDate: any;
  empOrDir: any;
  busOrLes: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPage');
  }

  nextFromOne() {
    this.slides.slideNext();

    console.log(this.policyInput)
  }

  lastFromOne(){
    this.slides.slidePrev();

    console.log(this.policyInput)
  }

  cancel() {
    this.navCtrl.pop();
  }

}
