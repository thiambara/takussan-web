import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    'path': '',
    loadComponent: () => import('./projects.component').then(m => m.ProjectsComponent),
  },
  {
    'path': ':id',
    loadComponent: () => import('./project-details/project-details.component').then(m => m.ProjectDetailsComponent),
  },
];
