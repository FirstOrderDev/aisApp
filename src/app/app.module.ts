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

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CameraPreview } from '@ionic-native/camera-preview';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TravelPage,
    MotorPage,
    PropertyPage,
    CameraModelPage,
    SettingsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TravelPage,
    MotorPage,
    PropertyPage,
    CameraModelPage,
    SettingsPage


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
