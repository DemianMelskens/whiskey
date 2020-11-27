import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Pagination} from "../../domain/pagination.model";

@Component({
    selector: 'app-pagination-controls',
    templateUrl: './pagination-controls.component.html',
    styleUrls: ['./pagination-controls.component.scss']
})
export class PaginationControlsComponent implements OnInit {
    @Input("pagination") pagination$?: Observable<Pagination>;

    @Output("currentPage") currentPageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output("pageSize") pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onChangePageSize(pageSize: number): void {
        this.pageSizeChange.emit(pageSize);
    }

    public changeCurrentPage(currentPage: number, totalPages: number): void {
        if (currentPage <= totalPages && currentPage > -1) {
            this.currentPageChange.emit(currentPage);
        }
    }
}
