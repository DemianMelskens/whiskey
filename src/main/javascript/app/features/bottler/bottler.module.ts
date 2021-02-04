import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottlersComponent} from './containers/bottlers/bottlers.component';
import {SharedModule} from '../../shared/shared.module';
import {BottlerRoutingModule} from './bottler-routing.module';


@NgModule({
    declarations: [
        BottlersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BottlerRoutingModule
    ]
})
export class BottlerModule {
}
