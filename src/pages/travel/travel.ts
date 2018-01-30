import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  insurerInput: any;
  nameInput: any;
  numberInput: any;
  firstCardValid: any;

  //card 2
  empOrDir: any;
  busOrLes: any;
  secondCardValid: any;

  //card 3
  myDate: any;
  address: any;
  thirdCardValid: any;

  //card 4
  selectedValue: any;
  infoText: any;
  fourthCardValid: any;
  bankInput: any;
  BSBInput: any;
  accountInput: any;

  //card 5
  options: any;
  images: any;
  fifthCardValid: any;
  otherImages: any;

  testImages: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, private imagePicker: ImagePicker,
    private base64: Base64, public loadingCtrl: LoadingController,
    private camera: Camera, private emailComposer: EmailComposer, private storage: Storage) {
      this.currentCard = 0;

      this.address = "Enter an address";

      this.firstCardValid = false;
      this.secondCardValid = false;
      this.thirdCardValid = false;
      this.fourthCardValid = false;
      this.fifthCardValid = false;

      this.images = [];

      this.otherImages = [];

      this.testImages = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPage');
    this.slides.lockSwipeToNext(true)
    }

  nextFromOne() {
    this.slides.slideNext();
  }

  lastFromOne(){
    this.slides.slidePrev();
  }

  cancel() {
    this.navCtrl.pop();
  }

  goTo(cardNum){
    if(this.currentCard>=cardNum){this.slides.slideTo(cardNum)}
  }

  slideChanged() {
    this.currentCard = this.slides.getActiveIndex();
    console.log(this.currentCard);
    if(this.currentCard == 0){
      console.log("Card " + this.currentCard + " is");
      if(this.firstCardValid == false){
        console.log("invalid");
        this.slides.lockSwipeToNext(true);
      }
      else{
        console.log("valid");
        this.slides.lockSwipeToNext(false);
      }
    }
    else if (this.currentCard == 1){
      console.log("Card " + this.currentCard + " is");
      if(this.secondCardValid == false){
        console.log("invalid");
        this.slides.lockSwipeToNext(true);
      }
      else{
        console.log("valid");
        this.slides.lockSwipeToNext(false);
      }
    }
    else if (this.currentCard == 2){
      console.log("Card " + this.currentCard + " is");
      if(this.thirdCardValid == false){
        console.log("invalid");
        this.slides.lockSwipeToNext(true);
      }
      else{
        console.log("valid")
        this.slides.lockSwipeToNext(false);
      }
    }
    else if (this.currentCard == 3){
      console.log("Card " + this.currentCard + " is");
      if(this.fourthCardValid == false){
        console.log("invalid");
        this.slides.lockSwipeToNext(true);
      }
      else{
        console.log("valid");
        this.slides.lockSwipeToNext(false);
      }
    }
    else if (this.currentCard == 4){
      console.log("Card " + this.currentCard + " is");
      if(this.fifthCardValid == false){
        console.log("invalid");
        this.slides.lockSwipeToNext(true);
      }
      else{
        console.log("valid");
        this.slides.lockSwipeToNext(false);
      }
    }
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

  firstCardChanged(){
    console.log("Changed");
    if(this.insurerInput && this.nameInput && this.numberInput){
      this.firstCardValid = true;
      console.log("valid");
      this.slides.lockSwipeToNext(false)
    }
    else{
      this.firstCardValid = false;
      this.slides.lockSwipeToNext(true)
    }
  }

  secondCardChanged(){
    console.log("Changed");
    if(this.empOrDir && this.busOrLes){
      this.secondCardValid = true;
      console.log("valid");
      this.slides.lockSwipeToNext(false)
    }
    else{
      this.secondCardValid = false;
      this.slides.lockSwipeToNext(true)
    }
  }

  thirdCardChanged(){
    console.log("Changed");
    if(this.address && this.address != "Enter an address" && this.myDate){
      this.thirdCardValid = true;
      console.log("valid");
      this.slides.lockSwipeToNext(false)
    }
    else{
      console.log("invalid")
      this.thirdCardValid = false;
      this.slides.lockSwipeToNext(true)
    }
  }

  fourthCardChanged(){
    console.log("Changed");
    if(this.selectedValue && this.infoText && this.bankInput && this.BSBInput && this.accountInput){
      this.fourthCardValid = true;
      console.log("valid");
      this.slides.lockSwipeToNext(false)
    }
    else{
      console.log("invalid")
      this.fourthCardValid = false;
      this.slides.lockSwipeToNext(true)
    }
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
    this.thirdCardChanged();  
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
          this.thirdCardChanged();
        }
      }
    ]
  });
  alert.present();
  }

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.testImages.push(imageData);

     this.base64.encodeFile(imageData).then((base64File: string) => {
       //console.log(base64File);
       this.images.push(base64File);
     }, (err) => {
       console.log(err);
     });


     //this.images.push(base64Image);
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
          this.images.push(results[i]);
      }
      loading.dismiss();
      }, (err) => { });
    }

    submit(){

      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {}
      });

      var date = new Date();
      console.log(this.images);

      var mail;

      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.images,
        subject: 'Travel claim from the mobile app',
        body: '<h1>Travel Claim From the Mobile App</h1>' + '<br />' + '<h3>Claim submitted on: </h3>' + date + '<br />' + '<h3>Insured Name: </h3>' + this.insurerInput + '<br />'
        + '<h3>First party name: </h3> ' + this.nameInput + '<h3>Contact Number: </h3>' + this.numberInput
        + '<br />' + '<h3>Employee or Director?: </h3> ' + this.empOrDir + '<br />' + '<h3>Business or Leisure?: </h3> ' + this.busOrLes + '<br />'
        + '<h3>Reason for Claim: </h3> ' + this.selectedValue + '<br />' + '<h3>Additional Information: </h3> ' + this.infoText + '<br />' + '<h3>Account Name: </h3> '
        + this.bankInput + '<br />' + '<h3>BSB Number: </h3>' + this.BSBInput + '<br />' + '<h3>Account Number: </h3>' + this.accountInput,

        isHtml: true
      };

      //Now we know we can send
      this.emailComposer.open(mail).then(() => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Thankyou for submitting your claim to Australian Insurance Solutions. A dedicated claims manager will be in contact with you as soon as possible.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();

      });
    }
}
