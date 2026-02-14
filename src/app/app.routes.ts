import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.LandingPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardPage),
  },
  {
    path: 'choferes',
    loadComponent: () => import('./pages/choferes/choferes').then((m) => m.ChoferesPage),
  },
  {
    path: 'coches',
    loadComponent: () => import('./pages/coches/coches').then((m) => m.CochesPage),
  },
  {
    path: 'recaudaciones',
    loadComponent: () =>
      import('./pages/recaudaciones/recaudaciones').then((m) => m.RecaudacionesPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
