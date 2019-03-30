import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tab-bar',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule',
          }
        ]
      },
      {
        path: 'find',
        children: [
          {
            path: '',
            loadChildren: '../find/find.module#FindPageModule',
          }
        ]
      },
      {
        path: 'eat',
        children: [
          {
            path: '',
            loadChildren: '../eat/eat.module#EatPageModule'
          }
        ]
      },
      {
        path: 'travel',
        children: [
          {
            path: '',
            loadChildren: '../travel/travel.module#TravelPageModule',
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-bar/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-bar/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
