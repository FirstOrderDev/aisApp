import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { MotorPage } from '../motor/motor';
import { Storage } from '@ionic/storage';
import { LicenseConfrimPage } from '../license-confrim/license-confrim';


/**
 * Generated class for the CameraModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-model',
  templateUrl: 'camera-model.html'
})
export class CameraModelPage {

  picture: any;
  emailPicture: any;
  who: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, public plt: Platform, private ng2ImgToolsService: Ng2ImgToolsService, private alertCtrl: AlertController, private storage: Storage) {

    this.who = this.navParams.get('who');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModelPage');

  }

  ionViewDidEnter(){
    this.plt.ready().then(()=> {
       let options = {
         x: 0,
         y: 0,
         width: window.screen.width,
         height: window.screen.height,
         camera: 'rear',
         tapPhoto: false,
         tapFocus: true,
         previewDrag: false,
         toBack: true,
       }
       this.cameraPreview.startCamera(options).then(
         (res)=> {
           console.log(res)
         },
         (err) => {
           console.log(err)
         });
     })
  }


  takePicture(){

    let pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 80
    }
    // this.navCtrl.push(LicenseConfrimPage, {
    //   pictureTaken: this.picture,
    //   who: this.who
    // })

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.emailPicture = 'base64:image.png//' + imageData;
      // console.log(this.picture);
      // var blob = new Blob([this.picture], {type: 'image/png'});
      // var file = new File([blob], 'imageFileName.png');
      //
      // var image = new Image();
      // image.src = this.picture;
      //
      // console.log(file);
      // this.ng2ImgToolsService.resize([file], 100, 100).subscribe(result => {
      //     //all good, result is a file
      //     console.info(result);
      //     console.log("test 2");
      // }, error => {
      //   console.log("error in resizing")
      //     //something went wrong
      //     //use result.compressedFile or handle specific error cases individually
      // });

      // let alert = this.alertCtrl.create({
      //   title: 'Use this picture?',
      //   template: '<img src="{{.picture}}"/>',
      //   buttons: [
      //     {
      //       text: 'Retake',
      //       role: 'cancel',
      //       handler: () => {
      //         this.picture = null;
      //       }
      //     },
      //     {
      //       text: 'Confirm',
      //       handler: () => {
      //         this.cameraPreview.stopCamera();
      //         this.storage.set('pic', this.picture);
      //         this.navCtrl.pop();
      //       }
      //     }
      //   ]
      // });
      // alert.present();
      this.navCtrl.push(LicenseConfrimPage, {
        pictureTaken: this.picture,
        who: this.who,
        emailPicture: this.emailPicture
      })
      this.cameraPreview.stopCamera();
    }, (err) => {
      console.log(err);
      this.picture = null;
    });

    console.log("test 1");



    console.log("test 3");

  }

  cancel(){
    this.cameraPreview.stopCamera();
    this.navCtrl.pop()
  }




  //camera options


}
