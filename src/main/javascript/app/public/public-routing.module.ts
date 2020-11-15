import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from "./public.component";
import {BottlesComponent} from './bottles/bottles.component';

const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            {path: '', redirectTo: 'bottles', pathMatch: 'full'},
            {path: 'bottles', component: BottlesComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {
}
