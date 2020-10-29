import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from "./private.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticatedGuard} from "../shared/guards/authenticated.guard";
import {NotAuthenticationGuard} from "../shared/guards/not-authenticated.guard";

const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', canActivate: [NotAuthenticationGuard], component: LoginComponent},
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
    exports: [RouterModule]
})
export class PrivateRoutingModule {
}
