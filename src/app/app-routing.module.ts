import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sites',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'nav',
    loadChildren: './nav/nav.module#NavPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'sites',
    children: [
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: './sites/sites.module#SitesPageModule',
      },
      {
        path: ':siteId',
        canLoad: [AuthGuard],
        loadChildren: './sites/site-detail/site-detail.module#SiteDetailPageModule'
      }
    ]
  },
  { path: 'travel', loadChildren: './travel/travel.module#TravelPageModule' },
  { path: 'find', loadChildren: './find/find.module#FindPageModule' },
  { path: 'eat', loadChildren: './eat/eat.module#EatPageModule' },
  { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
  { path: 'add-place', loadChildren: './eat/add-place/add-place.module#AddPlacePageModule' },
  { path: 'place-detail', loadChildren: './eat/place-detail/place-detail.module#PlaceDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
