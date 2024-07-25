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
        loadComponent: () => import('../../../pages/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
      },
      {
        'path': 'home',
        loadComponent: () => import('../../../pages/dashboard/home/home.component').then(m => m.HomeComponent)
      },
    ]
  },
];
