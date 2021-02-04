import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pagination} from "../../../../shared/domain/pagination.model";
import {Bottler} from '../../models/bottler.model';
import {BottlerService} from '../../bottler.service';

@Component({
    selector: 'app-bottlers',
    templateUrl: './bottlers.component.html',
    styleUrls: ['./bottlers.component.scss']
})
export class BottlersComponent implements OnInit {
    bottlers$: Observable<Bottler[]>;
    pagination$: Observable<Pagination>;

    constructor(private bottlerService: BottlerService) {
    }

    ngOnInit(): void {
        this.bottlers$ = this.bottlerService.bottlers$;
        this.pagination$ = this.bottlerService.pagination$;
    }

    changePageSize(pageSize: number) {
        this.bottlerService.updatePageSize(pageSize);
    }

    changeCurrentPage(currentPage: number) {
        this.bottlerService.updateCurrentPage(currentPage);
    }
}
