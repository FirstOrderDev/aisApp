import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, ToastController, Platform  } from 'ionic-angular';
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
import { CallNumber } from '@ionic-native/call-number';

import { LicenseInputPage } from '../license-input/license-input';



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

  mailAvailable: any;

  testImages: any;
  currentCard: number;

  //card 1
  insurersNameInput: any;
  nameInput: any;
  numberInput: any;
  firstCardValid: any;


  //card 2
  myDate: any;
  address: any;
  secondCardValid: any;


  //card 3
  selectedValue: any;
  vehicleDetailsMake: any
  vehicleDetailsModel: any;
  vehicleDetailsRegistration: any;
  vehicleDetailsYear: any
  thirdCardValid: any;


  //card 4
  selfLicense: any;
  selfLicenseEmail: any;
  selfLicenseInput: any;

  otherLicense: any;
  otherLicenseEmail: any;
  otherLicenseInput: any;
  fourthCardValid: any;


  //card 5
  options: any;
  images: any;
  fifthCardValid: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, private imagePicker: ImagePicker,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private camera: Camera, private emailComposer: EmailComposer, private storage: Storage, public popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public plt: Platform, private callNumber: CallNumber) {

    this.storage.set('pic', null);
    this.storage.set('otherPic', null);
    this.storage.set('picEmail', null);
    this.storage.set('otherPicEmail', null);
    this.storage.set('firstPartyLicenseInput', null);
    this.storage.set('thirdPartyLicenseInput', null);

    this.currentCard = 0;

    this.firstCardValid = false;
    this.secondCardValid = false;
    this.thirdCardValid = false;
    this.fourthCardValid = false;
    this.fifthCardValid = false;

    this.address = "Enter an address"

    this.options = {
      quality: 100
    }

    this.images = [];
    this.testImages = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
    this.slides.lockSwipeToNext(true)
  }

  ionViewDidEnter(){
    if(!this.selfLicense){
      this.storage.get('pic').then((val) => {
        //console.log('Your pic is', val);
        this.selfLicense = val;
        if(this.selfLicense){
          this.images[0] = this.selfLicense;
          this.fourthCardChanged();
        }

      });

      this.storage.get('picEmail').then((val) => {
        //console.log('Your pic is', val);
        this.selfLicenseEmail = val;
        if(this.selfLicenseEmail){
          this.testImages[0] = this.selfLicenseEmail;
          this.fourthCardChanged();

        }

      });
    }

    if(!this.otherLicense){
      this.storage.get('otherPic').then((val) => {
        console.log('Your pic is', val);
        this.otherLicense = val;
        if(this.otherLicense){
          this.images[1] = this.otherLicense;
          this.fourthCardChanged();
        }

      });

      this.storage.get('otherPicEmail').then((val) => {
        //console.log('Your pic is', val);
        this.otherLicenseEmail = val;
        if(this.otherLicenseEmail){
          this.testImages[1] = this.otherLicenseEmail;
          this.fourthCardChanged();
        }

      });
    }

    console.log("pic");
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

  cancel(){
    this.navCtrl.pop();
  }

  /// Validators ///

  firstCardChanged(){
    console.log("Changed");
    if(this.insurersNameInput && this.nameInput && this.numberInput){
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
    if(this.address && this.address != "Enter an address" && this.myDate){
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
    if(this.selectedValue && this.vehicleDetailsMake && this.vehicleDetailsModel && this.vehicleDetailsRegistration && this.vehicleDetailsYear){
      this.thirdCardValid = true;
      console.log("valid");
      this.slides.lockSwipeToNext(false)
    }
    else{
      this.thirdCardValid = false;
      this.slides.lockSwipeToNext(true)
    }
  }

  fourthCardChanged(){
    console.log("Changed");
    if((this.selfLicenseInput || this.selfLicense) && (this.otherLicenseInput || this.otherLicense)){
      this.fourthCardValid = true
      this.slides.lockSwipeToNext(false);
    }
    else{
      this.fourthCardValid = false;
      this.slides.lockSwipeToNext(true);
    }
  }

  //card 3 camera model
  openCameraModel(license){
    if(license=='self'){
      this.selfLicense=null;
      this.navCtrl.push(CameraModelPage, {
        who: 'self'
      });

    }else{
      this.otherLicense=null;
      this.navCtrl.push(CameraModelPage, {
        who: 'other'
      });
    }

    console.log("hey")
  }

  openLicense(license){
    let customPopOver = this.popoverCtrl.create(LicenseInputPage, {license: license}, {cssClass: 'custom-popover'});
    customPopOver.present();
    customPopOver.onDidDismiss(() => {


      if(license=="Your License"){
        this.storage.get('firstPartyLicenseInput').then((val) => {
          //console.log('Your pic is', val);

          if(val){
            this.selfLicenseInput = val;
            let toast = this.toastCtrl.create({
              message: 'Your license was saved',
              duration: 3000
            });
            toast.present();
            console.log(val);
            this.fourthCardChanged();
          }
          else{
            this.selfLicenseInput = null;
            this.fourthCardChanged();
          }

        });
      }

      if(license=="Third Party License"){
        this.storage.get('thirdPartyLicenseInput').then((val2) => {
          //console.log('Your pic is', val);
          console.log("back")
          if(val2){
            this.otherLicenseInput = val2;
            let toast = this.toastCtrl.create({
              message: 'Third party license was saved',
              duration: 3000
            });
            toast.present();
            this.fourthCardChanged();
          }
          else{
            this.otherLicenseInput = null;
            this.fourthCardChanged();
          }

        });
      }

    });
  }

  //step 2 (card 2) of motor

  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude;
      var long = resp.coords.longitude;
      console.log(lat);
      console.log(long);
      this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) => {
        this.address = result.subThoroughfare + ' ' + result.thoroughfare + ', ' + result.administrativeArea + ', ' + result.postalCode;
        console.log(this.address);
        if(this.address){
          this.secondCardChanged();
        }
      })
      .catch((error: any) => console.log(error));
    }).catch((error) => {
    console.log('Error getting location', error);
    });

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
          this.secondCardChanged();
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
       let base64Image = base64File;
       this.images.push(base64Image);
       console.log("Image done!")
     }, (err) => {
       console.log(err);
     });


     //this.images.push(base64Image);
    }, (err) => {
     // Handle error
     console.log(err);
    });
  }

  select(){
    const loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });

    this.imagePicker.getPictures(this.options).then((results) => {

      loading.present();
      for (var i = 0; i < results.length; i++) {

            this.testImages.push(results[i]);



            this.base64.encodeFile(results[i]).then((base64File: string) => {
              //console.log(base64File);
              let base64Image = base64File;
              this.images.push(base64Image);
            }, (err) => {
              console.log(err);
            });
      }
      loading.dismiss();


    }, (err) => { });
  }

  submit(){

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {}
    });

    var date = new Date();
    console.log(this.testImages);

    var mail;

    if(this.selfLicenseInput && this.otherLicenseInput){
      console.log("First choice")
      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.testImages,
        subject: 'Motor Vehicle claim from the mobile app',
        body: '<h1>Motor vehicle Claim From the Mobile App</h1>' + '<br />' + '<h3>Claim submitted on: </h3>' + '<br />' + date + '<h3>Insured Name:</h3> ' + this.insurersNameInput + '<br />' +  '<h3>First party name:</h3> ' + this.nameInput
        + '<br />' + '<h3>Contact Number:</h3> ' + this.numberInput + '<br />' + '<h3>Date of incident:</h3> ' +
        this.myDate + '<br />' + '<h3>Location of incident:</h3> ' + this.address + '<br />' + '<h3>Cause of incident:</h3> '
        + this.selectedValue + '<br />' + '<h3>Vehicle details: </h3>' + 'Make: ' + this.vehicleDetailsMake + '<br />' + 'Model: ' + this.vehicleDetailsModel + '<br />'
        + 'Year: ' + this.vehicleDetailsYear + '<br />' + 'Registration: ' + this.vehicleDetailsRegistration + '<br />' +
        '<h3>First Party License details:</h3>'  + 'First parties Name: ' + this.selfLicenseInput[2] + 'First parties license number: ' + this.selfLicenseInput[0] + '<br />' + 'First parties license address: ' + this.selfLicenseInput[1] +
        '<br />'  + '<br />' + '<h3>Third Party License details:</h3>' + 'Third parties Name: ' + this.otherLicenseInput[2] + 'Third parties license number: ' + this.otherLicenseInput[0] +
        '<br />' + 'Third parties license address: ' + this.otherLicenseInput[1] + '<br />' + '<br />' + '<br />' + 'Images of incident are attatched below.'
        + '<br />',

        isHtml: true
      };
    }
    else if(this.selfLicenseInput){
      console.log("Second choice")
      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.testImages,
        subject: 'Motor Vehicle claim from the mobile app',
        body: '<h1>Motor vehicle Claim From the Mobile App</h1>' + '<br />' + '<h3>Claim submitted on: </h3>' + '<br />' + date + '<h3>Insured Name:</h3> ' + this.insurersNameInput + '<br />' +  '<h3>First party name:</h3> ' + this.nameInput
        + '<br />' + '<h3>Contact Number:</h3> ' + this.numberInput + '<br />' + '<h3>Date of incident:</h3> ' +
        this.myDate + '<br />' + '<h3>Location of incident:</h3> ' + this.address + '<br />' + '<h3>Cause of incident:</h3> '
        + this.selectedValue + '<br />' + '<h3>Vehicle details: </h3>' + 'Make: ' + this.vehicleDetailsMake + '<br />' + 'Model: ' + this.vehicleDetailsModel + '<br />'
        + 'Year: ' + this.vehicleDetailsYear + '<br />' + 'Registration: ' + this.vehicleDetailsRegistration + '<br />' +
        '<h3>First Party License details:</h3>' + 'First parties Name: ' + this.selfLicenseInput[2] + 'First parties license number: ' + this.selfLicenseInput[0] + '<br />' + 'First parties license address: ' + this.selfLicenseInput[1] +
        '<br />' + '<br />' + '<h3>Third Party License details provided via picture (Photo 1):</h3>' + '<br />' + '<br />' + 'Images of incident are attatched below.'
        + '<br />',

        isHtml: true
      };
    }
    else if(this.otherLicenseInput){
      console.log("Third choice");
      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.testImages,
        subject: 'Motor Vehicle claim from the mobile app',
        body: '<h1>Motor vehicle Claim From the Mobile App</h1>' + '<br />' + '<h3>Claim submitted on: </h3>' + '<br />' + date + '<h3>Insured Name:</h3> ' + this.insurersNameInput + '<br />' +  '<h3>First party name:</h3> ' + this.nameInput
        + '<br />' + '<h3>Contact Number:</h3> ' + this.numberInput + '<br />' + '<h3>Date of incident:</h3> ' +
        this.myDate + '<br />' + '<h3>Location of incident:</h3> ' + this.address + '<br />' + '<h3>Cause of incident:</h3> '
        + this.selectedValue + '<br />' + '<h3>Vehicle details: </h3>' + 'Make: ' + this.vehicleDetailsMake + '<br />' + 'Model: ' + this.vehicleDetailsModel + '<br />'
        + 'Year: ' + this.vehicleDetailsYear + '<br />' + 'Registration: ' + this.vehicleDetailsRegistration + '<br />' +
        '<h3>First Party License details provided via picture (Photo 1):</h3>' + '<br />' + '<h3>Third Party License details:</h3>' + 'Third parties Name: ' + this.otherLicenseInput[2] + 'Third parties license number: ' + this.otherLicenseInput[0] +
        '<br />' + 'Third parties license address: ' + this.otherLicenseInput[1] + '<br />' + '<br />' + '<br />' + 'Images of incident are attatched below.'
        + '<br />',

        isHtml: true
      };
    }
    else{
      console.log("First choice");
      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.testImages,
        subject: 'Motor Vehicle claim from the mobile app',
        body: '<h1>Motor vehicle Claim From the Mobile App</h1>' + '<h2>Claim submitted on: </h2>' + date + '<br />' + '<h3>Insured Name:</h3> ' + this.insurersNameInput + '<br />' +  '<h3>First party name:</h3> ' + this.nameInput
        + '<br />' + '<h3>Contact Number:</h3> ' + this.numberInput + '<br />' + '<h3>Date of incident:</h3> ' +
        this.myDate + '<br />' + '<h3>Location of incident:</h3> ' + this.address + '<br />' + '<h3>Cause of incident:</h3> '
        + this.selectedValue + '<br />' + '<h3>Vehicle details: </h3>' + 'Make: ' + this.vehicleDetailsMake + '<br />' + 'Model: ' + this.vehicleDetailsModel + '<br />'
        + 'Year: ' + this.vehicleDetailsYear + '<br />' + 'Registration: ' + this.vehicleDetailsRegistration + '<br />' +
        '<h3>First Party License details provided via picture (Photo 1):</h3>' + '<br />' + '<h3>Third Party License details provided via picture (Photo 2):</h3>' + '<br />' + '<br />' + 'Images of incident are attatched below.'
        + '<br />',

        isHtml: true
      };
    }


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


    // Send a text message using default options


  }

}
