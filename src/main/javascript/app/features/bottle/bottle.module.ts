import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottlesComponent} from './containers/bottles/bottles.component';
import {BottleCardComponent} from './components/bottle-card/bottle-card.component';
import {SharedModule} from '../../shared/shared.module';
import {BottleRoutingModule} from './bottle-routing.module';


@NgModule({
    declarations: [
        BottlesComponent,
        BottleCardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BottleRoutingModule
    ]
})
export class BottleModule {
}
