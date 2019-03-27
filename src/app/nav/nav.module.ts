import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavPage } from './nav.page';
import { NavRoutingModule } from './nav-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NavRoutingModule
  ],
  declarations: [NavPage]
})
export class NavPageModule {}
