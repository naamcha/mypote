import { NgModule } from '@angular/core';
import { DistanceDisplayPipe } from './distance-display.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DistanceDisplayPipe
  ],
  exports: [
    DistanceDisplayPipe
  ],
  entryComponents: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {}
