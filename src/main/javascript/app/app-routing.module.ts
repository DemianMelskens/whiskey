import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
    {path: '', redirectTo: 'bottles', pathMatch: 'full'},
    {path: 'bottles', loadChildren: () => import('./features/bottle/bottle.module').then(m => m.BottleModule)},
    {path: 'bottlers', loadChildren: () => import('./features/bottler/bottler.module').then(m => m.BottlerModule)},
    {path: 'distilleries', loadChildren: () => import('./features/distillery/distillery.module').then(m => m.DistilleryModule)},
    {path: 'auth', loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: environment.enableTracing, useHash: environment.useRouteHash, relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
