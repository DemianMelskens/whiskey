import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DistilleriesComponent} from './containers/distilleries/distilleries.component';
import {SharedModule} from '../../shared/shared.module';
import {DistilleryRoutingModule} from './distillery-routing.module';


@NgModule({
    declarations: [
        DistilleriesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DistilleryRoutingModule
    ]
})
export class DistilleryModule {
}
