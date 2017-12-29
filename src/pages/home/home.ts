import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MotorPage } from '../motor/motor';
import { TravelPage } from '../travel/travel';
import { PropertyPage } from '../property/property';
import { SettingsPage } from '../settings/settings';
import { RoadsidePage } from '../roadside/roadside';


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
    else if(cardTapped=='Settings'){
      this.navCtrl.push(SettingsPage);
    }
    else if(cardTapped=='Roadside'){
      this.navCtrl.push(RoadsidePage);
    }



  }



}
