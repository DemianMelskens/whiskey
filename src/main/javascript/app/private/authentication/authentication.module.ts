import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from "./authentication.component";
import {RegisterComponent} from './register/register.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule
    ]
})
export class AuthenticationModule {
}
