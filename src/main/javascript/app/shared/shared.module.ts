import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';


@NgModule({
    declarations: [MenuComponent, UserMenuComponent],
    exports: [
        MenuComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule {
}
