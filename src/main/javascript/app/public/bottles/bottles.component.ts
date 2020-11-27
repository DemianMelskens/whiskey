import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Bottle} from '../../shared/domain/bottle.model';
import {BottleService} from '../../shared/services/bottle.service';
import {Pagination} from "../../shared/domain/pagination.model";

@Component({
    selector: 'app-bottles',
    templateUrl: './bottles.component.html',
    styleUrls: ['./bottles.component.scss']
})
export class BottlesComponent implements OnInit {
    bottles$: Observable<Bottle[]>;
    pagination$: Observable<Pagination>;

    constructor(private bottleService: BottleService) {
    }

    ngOnInit(): void {
        this.bottles$ = this.bottleService.bottles$;
        this.pagination$ = this.bottleService.pagination$;
    }

    changePageSize(pageSize: number) {
        this.bottleService.updatePageSize(pageSize);
    }

    changeCurrentPage(currentPage: number) {
        this.bottleService.updateCurrentPage(currentPage);
    }
}
