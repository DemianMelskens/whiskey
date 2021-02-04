import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pagination} from '../../../../shared/domain/pagination.model';
import {Distillery} from '../../models/distillery.model';
import {DistilleryService} from '../../distillery.service';

@Component({
    selector: 'app-distilleries',
    templateUrl: './distilleries.component.html',
    styleUrls: ['./distilleries.component.scss']
})
export class DistilleriesComponent implements OnInit {

    distilleries$: Observable<Distillery[]>;
    pagination$: Observable<Pagination>;

    constructor(private distilleryService: DistilleryService) {
    }

    ngOnInit(): void {
        this.distilleries$ = this.distilleryService.distilleries$;
        this.pagination$ = this.distilleryService.pagination$;
    }

    changePageSize(pageSize: number) {
        this.distilleryService.updatePageSize(pageSize);
    }

    changeCurrentPage(currentPage: number) {
        this.distilleryService.updateCurrentPage(currentPage);
    }
}
