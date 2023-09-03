import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    runGuardsAndResolvers: 'always',
  },
  {path: '**', redirectTo: ''},
];

export const appRouting = RouterModule.forRoot(appRoutes, {enableTracing: false});
