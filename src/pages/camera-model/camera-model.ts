import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

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
})
export class CameraModelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, public viewCtrl: ViewController ) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModelPage');
  }

  submit(){
    var data = "Image";
    this.viewCtrl.dismiss(data);
  }


  //camera options
  cameraPreviewOpts: CameraPreviewOptions = {
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

}
