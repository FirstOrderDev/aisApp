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

  otherImages: any;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, private imagePicker: ImagePicker,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private camera: Camera, private emailComposer: EmailComposer, private storage: Storage, public popoverCtrl: PopoverController, public toastCtrl: ToastController, public plt: Platform) {

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

    this.otherImages = [];

    this.testImages = [];


    this.plt.ready().then((readySource) => {
      if(this.plt.is('cordova')){
        console.log('Platform ready from', readySource);
        this.emailComposer.isAvailable().then((available: boolean) =>{
          if(available) {
            this.mailAvailable = true;
          }
          else{

            let confirm = this.alertCtrl.create({
            title: 'Unable to access mail',
            message: 'It looks like you are unable to access your email plugin, would you like to call AIS to make the claim instead?',
            buttons: [
              {
                text: 'No thanks',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Yes Please',
                handler: () => {
                  console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();

          }
        });
      }

    });

    if(!this.mailAvailable){
      let confirm = this.alertCtrl.create({
      title: 'Unable to access mail',
      message: 'It looks like you are unable to access your email plugin, would you like to call AIS to make the claim instead?',
      buttons: [
        {
          text: 'No thanks',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes Please',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    }

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
          this.images.push(this.selfLicense)
        }

      });

      this.storage.get('picEmail').then((val) => {
        //console.log('Your pic is', val);
        this.selfLicenseEmail = val;
        if(this.selfLicenseEmail){
          this.testImages.push(this.selfLicense)
        }

      });
    }

    if(!this.otherLicense){
      this.storage.get('otherPic').then((val) => {
        console.log('Your pic is', val);
        this.otherLicense = val;
        if(this.otherLicense){
          this.images.push(this.otherLicense)
          this.testImages.push(this.otherLicense)
        }

      });

      this.storage.get('otherPicEmail').then((val) => {
        //console.log('Your pic is', val);
        this.otherLicenseEmail = val;
        if(this.otherLicenseEmail){
          this.testImages.push(this.otherLicenseEmail)
        }

      });
    }

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
      .then((result: NativeGeocoderReverseResult) => this.address = result.subThoroughfare + ' ' + result.thoroughfare + ', ' + result.administrativeArea + ', ' + result.postalCode)
      .catch((error: any) => console.log(error));
    }).catch((error) => {
    console.log('Error getting location', error);
    });
    console.log(this.address);
    if(this.address){
      this.secondCardChanged();
    }
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
      if(results.length<15){
        loading.present();
        for (var i = 0; i < results.length; i++) {

              this.otherImages.push(results[i]);

              this.testImages.push(results[i]);



              this.base64.encodeFile(results[i]).then((base64File: string) => {
                //console.log(base64File);
                this.images.push(base64File);
              }, (err) => {
                console.log(err);
              });
        }
        loading.dismiss();
      }
      else{

      }

    }, (err) => { });
  }

  submit(){

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        this.mailAvailable = true;
      }
    });

    var date = new Date();

   let mail = {
     to: 'harrison.croaker@hotmail.com',
     attachments: this.testImages,
     subject: 'Motor Vehicle claim from the mobile app',
     body: '<h1>Motor vehicle Claim From Mobile App</h1>' + '<br />' + 'Policy Number: ' + this.insurersNameInput + '<br />' +  'Name: ' + this.nameInput
     + '<br />' + 'Contact Number: ' + this.numberInput + '<br />' + 'Date of incident: ' +
     this.myDate + '<br />' + 'Location of incident: ' + this.address + '<br />' + 'What Happend: '
     + this.selectedValue,

     isHtml: true
   };

    //Now we know we can send
    if(this.mailAvailable){
      this.emailComposer.open(mail);
    }




    // Send a text message using default options


  }

}
