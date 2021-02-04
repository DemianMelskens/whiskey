import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BottlersComponent} from './containers/bottlers/bottlers.component';

const routes: Routes = [
    {path: '', component: BottlersComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BottlerRoutingModule {
}
