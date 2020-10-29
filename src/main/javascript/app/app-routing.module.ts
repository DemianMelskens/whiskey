import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";

const routes: Routes = [
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: 'public', loadChildren: './public/public.module#PublicModule'},
  {path: 'private', loadChildren: './private/private.module#PrivateModule'}
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, {enableTracing: environment.enableTracing, useHash: environment.useRouteHash})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
