import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination-controls',
    templateUrl: './pagination-controls.component.html',
    styleUrls: ['./pagination-controls.component.scss']
})
export class PaginationControlsComponent implements OnInit {
    @Input("criteria") criteria?: string = '';
    @Input("pageSize") pageSize?: number = 20;
    @Input("pageSizes") pageSizes?: number[] = [20, 50, 100];
    @Input("currentPage") currentPage?: number = 0;

    @Output("onPageChange") pageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output("onSizeChange") sizeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output("onCriteriaChange") criteriaChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onCriteriaChange(): void {

    }

    public onSizeChange(size: number): void {
        this.sizeChange.emit(size);
    }
}
