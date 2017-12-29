import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadsidePage } from './roadside';

@NgModule({
  declarations: [
    RoadsidePage,
  ],
  imports: [
    IonicPageModule.forChild(RoadsidePage),
  ],
})
export class RoadsidePageModule {}
