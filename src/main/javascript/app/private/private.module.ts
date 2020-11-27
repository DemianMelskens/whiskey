import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateComponent} from './private.component';
import {PrivateRoutingModule} from "./private-routing.module";
import {AdminModule} from "./admin/admin.module";
import {AuthenticationModule} from "./authentication/authentication.module";


@NgModule({
    declarations: [PrivateComponent],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        AuthenticationModule,
        AdminModule
    ]
})
export class PrivateModule {
}
