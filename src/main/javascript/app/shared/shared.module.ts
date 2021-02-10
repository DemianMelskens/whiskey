import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/menu/menu.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {PaginationControlsComponent} from './components/pagination-controls/pagination-controls.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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
        PaginationControlsComponent,
        FontAwesomeModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule
    ]
})
export class SharedModule {
}
