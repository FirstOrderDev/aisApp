import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraModelPage } from '../camera-model/camera-model';
import { EmailComposer } from '@ionic-native/email-composer';
import { Storage } from '@ionic/storage';



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
  address: any;

  //card 3
  selectedValue: any;
  selfLicense: any;

  //card 4
  otherLicense: any;

  //card 5
  options: any;
  images: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, private imagePicker: ImagePicker,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private camera: Camera, private emailComposer: EmailComposer, private storage: Storage) {

    this.storage.set('pic', null);
    this.storage.set('otherPic', null);

    this.currentCard = 0;

    this.policy_input = "Policy Number";
    this.name_input = "Your Name";
    this.number_input = "Contact Number (+61)";

    this.address = "Enter an address"

    this.options = null;
    this.images = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
  }

  ionViewDidEnter(){
    this.storage.get('pic').then((val) => {
      console.log('Your pic is', val);
      this.selfLicense = val;
      if(this.selfLicense){
        this.images.push(this.selfLicense)
      }

    });

    this.storage.get('otherPic').then((val) => {
      console.log('Your pic is', val);
      this.otherLicense = val;
      if(this.otherLicense){
        this.images.push(this.otherLicense)
      }

    });
    console.log("pic");
  }

  slideChanged() {
    this.currentCard = this.slides.getActiveIndex();
  }

  nextCard() {
    this.currentCard += 1;
    console.log(this.currentCard);
    console.log(this.selectedValue);

    this.slides.slideNext();

    // console.log(this.policyInput);
    // console.log(this.nameInput);
    // console.log(this.numberInput);



  }

  previousCard(){
    this.currentCard -= 1;
    console.log(this.currentCard)
    this.slides.slidePrev();
  }

  cancel(){
    this.navCtrl.pop();
  }

  //card 3 camera model
  openCameraModel(license){
    if(license=='self'){
      this.navCtrl.push(CameraModelPage, {
        who: 'self'
      });
    }else{
      this.navCtrl.push(CameraModelPage, {
        who: 'other'
      });
    }

    console.log("hey")
  }

  //step 3 (card 2) of motor

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

  //step 6 (card 5)

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.images.push(base64Image);
    }, (err) => {
     // Handle error
    });
  }

  select(){
    const loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });

    this.imagePicker.getPictures(this.options).then((results) => {
    loading.present();
    for (var i = 0; i < results.length; i++) {

          this.base64.encodeFile(results[i]).then((base64File: string) => {
            //console.log(base64File);
            this.images.push(base64File);
          }, (err) => {
            console.log(err);
          });
      }
      loading.dismiss();
    }, (err) => { });
    }

  submit(){
    if(this.policyInput && this.nameInput && this.numberInput){

    } else {
      if(!this.policyInput){
        this.policy_input = "*Please input a policy number";
        document.getElementById("p2").style.color = "red";
      }
      if(!this.nameInput){
        this.name_input = "*Please input your name";
      }
      if(!this.numberInput){
        this.number_input = "*Please input a contact number";
      }
      this.slides.slideTo(0);
      return;
    }

    if(this.myDate && this.address){

    } else {
      this.slides.slideTo(1);
      return;
    }


    /*
    if(this.options && this.images){

    } else {
      return;
    }*/



    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {}
    });



     let mail = {
       to: 'harrison_croaker@hotmail.com',
       attachments: [
         'base64:'+ this.selfLicense
       ],
       subject: 'Claim from the mobile app',
       body: 'Policy Number: ' + this.policyInput + '<br />' +  'Name: ' + this.nameInput
       + '<br />' + 'Contact Number: ' + this.numberInput + '<br />' + 'Date of incident: ' +
       this.myDate + '<br />' + 'Address of incident: ' + this.address + '<br />' + 'What Happend: '
       + this.selectedValue,

       isHtml: true
     };

      //Now we know we can send
      this.emailComposer.open(mail);



    // Send a text message using default options


  }

}
