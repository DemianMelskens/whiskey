import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicRoutingModule} from "./public-routing.module";
import {PublicComponent} from './public.component';
import {SharedModule} from "../shared/shared.module";
import {BottlesComponent} from './bottles/bottles.component';
import {DistilleriesComponent} from './distilleries/distilleries.component';
import {BottlersComponent} from './bottlers/bottlers.component';


@NgModule({
    declarations: [
        PublicComponent,
        BottlesComponent,
        BottlersComponent,
        DistilleriesComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedModule
    ]
})
export class PublicModule {
}
