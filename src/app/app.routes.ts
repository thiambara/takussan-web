import {Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {notAuthGuard} from "./core/guards/not-auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    'path': 'dashboard',
    canActivate: [authGuard],
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
    canActivate: [notAuthGuard],
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    'path': 'sign-up',
    canActivate: [notAuthGuard],
    loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
  }
];
