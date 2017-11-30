import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MotorPage } from '../motor/motor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  open(cardTapped){
    this.navCtrl.push(MotorPage);

  }



}
