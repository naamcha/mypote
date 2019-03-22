import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SitesPage } from './sites.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SitesPage,
    children: [
      {
        path: 'to-site',
        children: [
          {
            path: '',
            loadChildren: '../to-site/to-site.module#ToSitePageModule',
          }
        ]
      },
      {
        path: 'on-site',
        children: [
          {
            path: '',
            loadChildren: '../on-site/on-site.module#OnSitePageModule'
          }
        ]
      },
      {
        path: 'from-site',
        children: [
          {
            path: '',
            loadChildren: '../from-site/from-site.module#FromSitePageModule',
          }
        ]
      },
      {
        path: '',
        redirectTo: '/sites/tabs/on-site',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/sites/tabs/on-site'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
