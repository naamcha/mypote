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
      }
    ]
  },
  {
    path: 'taxi/:id',
    canLoad: [AuthGuard],
    loadChildren: './taxi/taxi.module#TaxiPageModule'
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
