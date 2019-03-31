import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';
// import { IBeacon } from '@ionic-native/IBeacon/ngx';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { IonicStorageModule } from '@ionic/storage';

// import {Coordinate} from "tsgeo/Coordinate";
// import {Vincenty}   from "tsgeo/Distance/Vincenty";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    Storage,
    NFC,
    Ndef,
    Toast,
    // IBeacon,
    Hotspot,
    Geolocation,
    // Coordinate,
    // Vincenty,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
