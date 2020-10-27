import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateComponent} from './private.component';
import {LoginComponent} from "./login/login.component";
import {PrivateRoutingModule} from "./private-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PrivateComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule {
}
