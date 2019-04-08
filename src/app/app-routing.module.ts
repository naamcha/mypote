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
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'conf',
    loadChildren: './conf/conf.module#ConfPageModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'sites',
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './sites/sites.module#SitesPageModule',
      },
      {
        path: ':siteId',
        loadChildren: './sites/site-detail/site-detail.module#SiteDetailPageModule'
      },
      {
        path: ':siteId/dysfunction',
        loadChildren: './sites/dysfunction/dysfunction.module#DysfunctionPageModule'
      },
      {
        path: ':siteId/security',
        loadChildren: './sites/security/security.module#SecurityPageModule'
      },
      {
        path: ':siteId/site-numbers',
        loadChildren: './sites/site-numbers/site-numbers.module#SiteNumbersPageModule'
      }
    ]
  },
  {
    path: 'journey',
    canLoad: [AuthGuard],
    children: [
      {
        path: 'tag1',
        loadChildren: './journey/tag1/tag1.module#Tag1PageModule'
      },
      {
        path: 'tag2',
        loadChildren: './journey/tag2/tag2.module#Tag2PageModule'
      },
      {
        path: 'tag3',
        loadChildren: './journey/tag3/tag3.module#Tag3PageModule'
      },
      {
        path: 'tag4',
        loadChildren: './journey/tag4/tag4.module#Tag4PageModule'
      },
      {
        path: 'journey-history',
        loadChildren: './journey/journey-history/journey-history.module#JourneyHistoryPageModule'
      },
    ]
  },
  {
    path: 'conf',
    canLoad: [AuthGuard],
    loadChildren: './conf/conf.module#ConfPageModule'
  },
  { 
    path: 'associate-wifi/:wifiId', 
    canLoad: [AuthGuard], 
    loadChildren: './associate-wifi/associate-wifi.module#AssociateWifiPageModule' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
