import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { AuthService } from './auth/auth.service';
import { SitesService } from './sites/sites.service';
import { Site } from './core/models/site.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  activeSite: Site;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private sitesService: SitesService,
    private router: Router,
    private storage: Storage,
    private toast: Toast,
    private nfc: NFC
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.siteId.subscribe(site => {
      this.activeSite = this.sitesService.getSite(site);
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.nfc.addTagDiscoveredListener(nfcEvent =>
        this.sesReadNFC(nfcEvent)).subscribe(data => {
          // vérifier le site
          console.log('nfc data', data);
          this.storage.get('searchType').then(searchType => {
            if (searchType) {
              this.storage.get('searchIdentifier').then(searchIdentifier => {
                if (searchIdentifier) {
                  // this.navCtrl.setRoot(MyPoteInfoPage,searchIdentifier);
                } else {
                  // this.navCtrl.setRoot(EtreGuidVersPage,searchType);
                }
              });
            } else {
              this.router.navigateByUrl('/sites/tab-bar/sites');
            }
          });
        });
      });
  }

  sesReadNFC(data): void {
    const toast = this.toast.show(
      'NFC_WORKING',
      '6000',
      'bottom'
    );
    console.log('nfc working', data);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
