import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from "./private.component";
import {AuthenticatedGuard} from "../shared/guards/authenticated.guard";

const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        children: [
            {path: '', redirectTo: 'auth', pathMatch: 'full'},
            {
                path: 'auth',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            },
            {
                path: 'admin',
                canActivate: [AuthenticatedGuard],
                loadChildren: './admin/admin.module#AdminModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthenticatedGuard]
})
export class PrivateRoutingModule {
}
