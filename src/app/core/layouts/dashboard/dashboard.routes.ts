import {Routes} from '@angular/router';
import {authGuard} from "../../guards/auth.guard";

export const routes: Routes = [
  {
    'path': '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard.layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        'path': '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        loadChildren: () => import('../../../pages/dashboard/projects/projects.routes').then(m => m.routes),
      },
      {
        'path': 'home',
        loadComponent: () => import('../../../pages/dashboard/home/home.component').then(m => m.HomeComponent)
      },
    ]
  },
];
