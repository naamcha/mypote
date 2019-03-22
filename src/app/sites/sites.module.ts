import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SitesPage } from './sites.page';
import { SitesRoutingModule } from './sites-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SitesRoutingModule
  ],
  declarations: [SitesPage]
})
export class SitesPageModule {}
