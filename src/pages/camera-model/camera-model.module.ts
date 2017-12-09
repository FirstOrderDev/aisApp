import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraModelPage } from './camera-model';

@NgModule({
  declarations: [
    CameraModelPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraModelPage),
  ],
})
export class CameraModelPageModule {}
