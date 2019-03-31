import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';
// import { IBeacon } from '@ionic-native/IBeacon/ngx';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SitesService } from './sites/sites.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule
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
    SitesService,
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
