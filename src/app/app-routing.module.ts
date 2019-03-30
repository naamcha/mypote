import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsPageModule',
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
  {
    path: 'journey',
    loadChildren: './journey/journey.module#JourneyPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
