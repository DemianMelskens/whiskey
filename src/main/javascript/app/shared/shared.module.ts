import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/menu/menu.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {PaginationControlsComponent} from './components/pagination-controls/pagination-controls.component';


@NgModule({
    declarations: [
        MenuComponent,
        UserMenuComponent,
        LoaderComponent,
        PageNotFoundComponent,
        PaginationControlsComponent
    ],
    exports: [
        MenuComponent,
        UserMenuComponent,
        LoaderComponent,
        PageNotFoundComponent,
        PaginationControlsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule {
}
