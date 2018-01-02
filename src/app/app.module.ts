import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TravelPage } from '../pages/travel/travel';
import { MotorPage } from '../pages/motor/motor';
import { PropertyPage } from '../pages/property/property';
import { CameraModelPage } from '../pages/camera-model/camera-model';
import { SettingsPage } from '../pages/settings/settings';
import { RoadsidePage } from '../pages/roadside/roadside';
import { LicenseConfrimPage } from '../pages/license-confrim/license-confrim';
import { AdditionalInfoPopoverPage } from '../pages/additional-info-popover/additional-info-popover';
import { LicenseInputPage } from '../pages/license-input/license-input';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CameraPreview } from '@ionic-native/camera-preview';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { IonicStorageModule } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TravelPage,
    MotorPage,
    PropertyPage,
    CameraModelPage,
    SettingsPage,
    RoadsidePage,
    LicenseConfrimPage,
    AdditionalInfoPopoverPage,
    LicenseInputPage

  ],
  imports: [
    BrowserModule,
    Ng2ImgToolsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TravelPage,
    MotorPage,
    PropertyPage,
    CameraModelPage,
    SettingsPage,
    RoadsidePage,
    LicenseConfrimPage,
    AdditionalInfoPopoverPage,
    LicenseInputPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    Base64,
    Camera,
    ImagePicker,
    CameraPreview,
    EmailComposer,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
