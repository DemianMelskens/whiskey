import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/menu/menu.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {SubscriptionComponent} from './components/base/subscription/subscription.component';
import { BottleCardComponent } from './components/bottles/bottle-card/bottle-card.component';
import { PaginationControlsComponent } from './components/pagination-options/pagination-controls.component';


@NgModule({
    declarations: [
        MenuComponent,
        UserMenuComponent,
        LoaderComponent,
        SubscriptionComponent,
        PageNotFoundComponent,
        BottleCardComponent,
        PaginationControlsComponent
    ],
    exports: [
        MenuComponent,
        UserMenuComponent,
        LoaderComponent,
        PageNotFoundComponent,
        BottleCardComponent,
        PaginationControlsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule {
}
