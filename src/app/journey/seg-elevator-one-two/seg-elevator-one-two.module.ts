import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SegElevatorOneTwoPage } from './seg-elevator-one-two.page';

const routes: Routes = [
  {
    path: '',
    component: SegElevatorOneTwoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SegElevatorOneTwoPage]
})
export class SegElevatorOneTwoPageModule {}
