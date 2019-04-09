import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NewsItemComponent } from './news-item/news-item.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { ParkingItemComponent } from './parking-item/parking-item.component';
import { JourneyItemComponent } from './journey-item/journey-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NewsItemComponent,
    CalendarItemComponent,
    ParkingItemComponent,
    JourneyItemComponent
  ],
  exports: [
    NewsItemComponent,
    CalendarItemComponent,
    ParkingItemComponent,
    JourneyItemComponent
  ]
})
export class ComponentsModule {}
