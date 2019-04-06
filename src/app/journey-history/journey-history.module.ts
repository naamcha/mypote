import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JourneyHistoryPage } from './journey-history.page';

const routes: Routes = [
  {
    path: '',
    component: JourneyHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JourneyHistoryPage]
})
export class JourneyHistoryPageModule {}
