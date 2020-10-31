import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthenticationComponent} from "./authentication.component";
import {RegisterComponent} from "./register/register.component";
import {NotAuthenticationGuard} from "../../shared/guards/not-authenticated.guard";

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', canActivate: [NotAuthenticationGuard], component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
