import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { General1Page } from '../general1/general1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  open(cardTapped){
    console.log(cardTapped);
    if (cardTapped=="General"){
      this.navCtrl.push(General1Page);

    }
  }



}
