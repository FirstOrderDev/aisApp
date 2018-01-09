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
import { PopoverController } from 'ionic-angular';
import { AdditionalInfoPopoverPage } from '../additional-info-popover/additional-info-popover';





@IonicPage()
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {

  currentCard: number;

  //card 1
  nameInput: any;
  numberInput: any;
  bankInput: any;
  BSBInput: any;
  accountInput: any;
  firstCardValid: any;

  name_input: any;
  number_input: any;
  bank_input: any;
  BSB_input: any;
  account_input: any;

  //card 2
  myDate: any;
  address: any;
  secondCardValid: any;

  //card 3
  selectedValue: any;
  adInfoText: any;
  thirdCardValid: any;

  //card 4
  policeNumber: any;
  police_number: any;
  info_text: any;
  infotext: any;
  fourthCardValid: any;


  //card 5
  options: any;
  images: any;


  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, private imagePicker: ImagePicker,
    private base64: Base64, public loadingCtrl: LoadingController, public modal: ModalController,
    private camera: Camera, private emailComposer: EmailComposer, private storage: Storage, public popoverCtrl: PopoverController) {
    this.currentCard = 0;


    this.name_input = "Your Name";
    this.number_input = "Contact Number (+61)";
    this.bank_input = "Account Name";
    this.BSB_input = "BSB Number";
    this.account_input = "Account Number";
    this.firstCardValid = false;

    this.address = "Enter an address"
    this.secondCardValid = false;


    this.options = null;
    this.images = [];
    this.thirdCardValid = false;



    this.police_number = "Police event number"
    this.info_text = "Other information"
    this.fourthCardValid = false;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
    this.slides.lockSwipeToNext(true)
  }

  ionViewDidEnter(){
    this.storage.get('pic').then((val) => {
      console.log('Your pic is', val);
      this.selfLicense = val;
    });

    this.storage.get('otherPic').then((val) => {
      console.log('Your pic is', val);
      this.otherLicense = val;
    });
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

  firstCardChanged(){
    console.log("Changed");
    if(this.nameInput && this.numberInput && this.bankInput && this.BSBInput && this.accountInput){
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
    if(this.selectedValue && this.adInfoText){
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
    if(this.policeNumber && this.infotext){
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

  //card 3 camera model
  // openCameraModel(license){
  //   if(license=='self'){
  //     this.navCtrl.push(CameraModelPage, {
  //       who: 'self'
  //     });
  //   }else{
  //     this.navCtrl.push(CameraModelPage, {
  //       who: 'other'
  //     });
  //   }
  //
  //   console.log("hey")
  // }

  //step 3 (card 2)

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

  //card 4

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AdditionalInfoPopoverPage);
  popover.present({
    ev: myEvent
  });
}

  // step 6 (card 5)

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
    if(this.nameInput && this.numberInput && this.bankInput && this.BSBInput && this.accountInput){

    } else {

      if(!this.nameInput){
        this.name_input = "*Please input your name";
        document.getElementById("p2").style.color = "red";
      }
      if(!this.numberInput){
        this.number_input = "*Please input a contact number";
      }
      if(!this.bankInput){
        this.bank_input = "*Please input your bank name"
      }
      if(!this.BSBInput){
        this.BSB_input = "*Please input your bsb number"
      }
      if(!this.accountInput){
        this.account_input = "*Please input your account number"
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
    if(available) {
       //Now we know we can send
     }
    });

    let email = {
      to: 'harrison.croaker@hotmail.com',
      attachments: [
        'this.selfLicense'
      ],
      subject: 'Claim from the mobile app',
      body:
      'Name: ' + this.nameInput + '<br />' +
      'Contact Number: ' + this.numberInput + '<br />' +
      'Bank Name: ' + this.bankInput + '<br />' +
      'BSB Number: ' + this.BSBInput + '<br />' +
      'Account Number: ' + this.accountInput + '<br />' +
      'Date of incident: ' + this.myDate + '<br />' +
      'Address of incident: ' + this.address + '<br />' +
      'Reason: '+ this.selectedValue + '<br />' +
      'Description: '+ this.adInfoText + '<br />' +
      'Police Event Number: ' + this.policeNumber + '<br />' +
      'Additional Information: ' + this.infotext,

      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }

}
