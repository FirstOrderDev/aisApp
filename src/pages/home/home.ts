import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MotorPage } from '../motor/motor';
import { TravelPage } from '../travel/travel';
import { PropertyPage } from '../property/property';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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


  }



}
