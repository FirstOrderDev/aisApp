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
    this.fourthCardValid = true;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotorPage');
    this.slides.lockSwipeToNext(true)
  }

  ionViewDidEnter(){

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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:

     this.images.push(imageData);
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

      if(this.policeNumber){

      }else{

      }

      if(this.infotext){

      }else{

      }

      mail = {
        to: 'harrison.croaker@hotmail.com',
        attachments: this.images,
        subject: 'Property claim from the mobile app',
        body: '<h1>Property Claim From the Mobile App</h1>' + '<br />' + '<h3>Claim submitted on: </h3>' + date + '<br />' +  '<h3>First party name: </h3> ' + this.nameInput + '<br />' + '<h3>Contact Number: </h3>' + this.numberInput
        + '<br />' + '<h3>Account Name: </h3> ' + this.bankInput + '<br />' + '<h3>BSB Number: </h3> ' + this.BSBInput + '<br />' + '<h3>Account Number: </h3> ' + this.accountInput + '<br />'
        + '<h3>Date of Incident: </h3> ' + this.myDate + '<br />' + '<h3>Location of incident: </h3> ' + this.address + '<br />' + '<h3>Reason for Claim: </h3> '
        + this.selectedValue + '<br />' + '<h3>Additional Information: </h3>' + this.adInfoText + '<br />'
        + '<h3>Police Event Number: </h3>' + this.policeNumber + '<br />' + '<h3>Additional Information: </h3>' + this.infotext,

        isHtml: true
      };

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
