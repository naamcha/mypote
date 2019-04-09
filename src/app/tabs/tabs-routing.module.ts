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
          },
          {
            path: 'meeting-detail',
            loadChildren: '../home/meeting-detail/meeting-detail.module#MeetingDetailPageModule'
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
          },
          {
            path: 'person',
            children: [
              {
                path: '',
                loadChildren: './find/person/person.module#PersonPageModule'
              },
              {
                path: ':personId',
                loadChildren: './find/person/person-detail/person-detail.module#PersonDetailPageModule'
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
          {
            path: 'taxi/:id',
            loadChildren: '../travel/taxi/taxi.module#TaxiPageModule'
          },
          {
            path: 'guides',
            loadChildren: '../travel/guides/guides.module#GuidesPageModule'
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
