import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';


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

  insurer_input: any;
  name_input: any;
  number_input: any;

  //card 2
  myDate: any;
  empOrDir: any;
  busOrLes: any;

  //card 3
  address: any;
  selectedValue: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController) {
      this.currentCard = 0;

      this.insurer_input = "Policy Number";
      this.name_input = "Your Name";
      this.number_input = "Contact Number (+61)";

      this.address = "Enter an address"
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

  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude;
      var long = resp.coords.longitude;
      console.log(lat);
      console.log(long);
      this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) => this.address = result.subThoroughfare + ' ' + result.thoroughfare + ', ' + result.administrativeArea + ', ' + result.postalCode)
      .catch((error: any) => console.log(error));
    }).catch((error) => {
    console.log('Error getting location', error);
    });
    console.log(this.address);
  }

  enterAddress(){
    let alert = this.alertCtrl.create({
    title: 'Enter address',
    inputs: [
      {
        name: 'address',
        placeholder: 'Address'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
          console.log(data.address);
          this.address = data.address;
        }
      }
    ]
  });
  alert.present();
  }


}
