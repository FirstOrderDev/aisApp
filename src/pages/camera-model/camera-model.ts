import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

/**
 * Generated class for the CameraModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-model',
  templateUrl: 'camera-model.html',
  providers: [CameraPreview]
})
export class CameraModelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, public viewCtrl: ViewController ) {
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // // picture options
    // const pictureOpts: CameraPreviewPictureOptions = {
    //   width: 1280,
    //   height: 1280,
    //   quality: 85
    // }

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    });

    // // Set the handler to run every time we take a picture
    // this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
    //   console.log(result);
    //   // do something with the result
    // });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModelPage');
  }






  // take a picture
  // this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
  //   this.picture = 'data:image/jpeg;base64,' + imageData;
  // }, (err) => {
  //   console.log(err);
  //   this.picture = 'assets/img/test.jpg';
  // });

  submit(){
    var data = "Image";
    this.viewCtrl.dismiss(data);
  }


  //camera options


}
