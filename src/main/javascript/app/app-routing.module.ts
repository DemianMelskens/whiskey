import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
    {path: '', redirectTo: 'bottles', pathMatch: 'full'},
    {path: 'bottles', loadChildren: './features/bottle/bottle.module#BottleModule'},
    {path: 'bottlers', loadChildren: './features/bottler/bottler.module#BottlerModule'},
    {path: 'distilleries', loadChildren: './features/distillery/distillery.module#DistilleryModule'},
    {path: 'auth', loadChildren: './features/authentication/authentication.module#AuthenticationModule'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: environment.enableTracing, useHash: environment.useRouteHash})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
