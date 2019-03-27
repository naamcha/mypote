import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavPage } from './nav.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NavPage,
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
        redirectTo: '/nav/tabs/to-site',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    // redirectTo: '/nav/tabs/on-site'
    redirectTo: '/nav/tabs/to-site'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule {}
