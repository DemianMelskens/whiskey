import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DistilleriesComponent} from './containers/distilleries/distilleries.component';

const routes: Routes = [
    {path: '', component: DistilleriesComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DistilleryRoutingModule {
}
