import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MotorPage } from './motor';

@NgModule({
  declarations: [
    MotorPage,
  ],
  imports: [
    IonicPageModule.forChild(MotorPage),
  ],
})
export class MotorPageModule {}
