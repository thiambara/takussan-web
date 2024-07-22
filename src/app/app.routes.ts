import {Routes} from '@angular/router';
import {dashboardGuard} from "./core/guards/dashboard.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    'path': 'dashboard',
    canActivate: [dashboardGuard],
    loadComponent: () => import('./core/layouts/dashboard/dashboard.layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        'path': '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        'path': 'home',
        loadComponent: () => import('./pages/dashboard/home/home.component').then(m => m.HomeComponent)
      },
    ]
  },
  {
    'path': 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  }
];
