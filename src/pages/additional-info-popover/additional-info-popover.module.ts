import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalInfoPopoverPage } from './additional-info-popover';

@NgModule({
  declarations: [
    AdditionalInfoPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalInfoPopoverPage),
  ],
})
export class AdditionalInfoPopoverPageModule {}
