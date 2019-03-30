import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NewsItemComponent } from './news-item/news-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NewsItemComponent
  ],
  exports: [
    NewsItemComponent
  ]
})
export class ComponentsModule {}
