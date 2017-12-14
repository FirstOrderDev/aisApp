import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Ng2ImgToolsService } from 'ng2-img-tools';



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

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, public plt: Platform, private ng2ImgToolsService: Ng2ImgToolsService) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModelPage');

  }


  takePicture(){

    let pictureOpts = {
      width: window.screen.width,
      height: window.screen.height,
      quality: 100
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log(this.picture);
      var blob = new Blob([this.picture], {type: 'image/png'});
      var file = new File([blob], 'imageFileName.png');

      var image = new Image();
      image.src = this.picture;

      console.log(file);
      this.ng2ImgToolsService.resize([file], 100, 100).subscribe(result => {
          //all good, result is a file
          console.info(result);
          console.log("test 2");
      }, error => {
        console.log("error in resizing")
          //something went wrong
          //use result.compressedFile or handle specific error cases individually
      });
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

    console.log("test 1");



    console.log("test 3");



  }

  submit(){
    this.cameraPreview.stopCamera();
    this.navCtrl.pop();
  }

  cancel(){
    this.cameraPreview.stopCamera();
    this.navCtrl.pop();
  }




  //camera options


}
