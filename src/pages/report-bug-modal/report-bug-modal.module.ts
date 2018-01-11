import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportBugModalPage } from './report-bug-modal';

@NgModule({
  declarations: [
    ReportBugModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportBugModalPage),
  ],
})
export class ReportBugModalPageModule {}
