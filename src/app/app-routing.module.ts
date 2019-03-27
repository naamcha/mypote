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
        loadChildren: './sites/sites.module#SitesPageModule',
      },
      {
        path: ':siteId',
        loadChildren: './sites/site-detail/site-detail.module#SiteDetailPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
