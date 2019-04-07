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
          },
          {
            path: 'room',
            children: [
              {
                path: '',
                loadChildren: '../find/room/room.module#RoomPageModule',
              },
              {
                path: 'room-help',
                loadChildren: '../find/room/room-help/room-help.module#RoomHelpPageModule'
              },
              {
                path: ':roomId',
                loadChildren: '../find/room/room-detail/room-detail.module#RoomDetailPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'eat',
        children: [
          {
            path: '',
            loadChildren: '../eat/eat.module#EatPageModule'
          },
          {
            path: 'add-place',
            loadChildren: '../eat/add-place/add-place.module#AddPlacePageModule'
          },
          {
            path: 'place-detail',
            loadChildren: '../eat/place-detail/place-detail.module#PlaceDetailPageModule'
          },
        ]
      },
      {
        path: 'travel',
        children: [
          {
            path: '',
            loadChildren: '../travel/travel.module#TravelPageModule',
          },
          {
            path: ':siteId/parking',
            loadChildren: '../travel/parking/parking.module#ParkingPageModule'
          },
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
