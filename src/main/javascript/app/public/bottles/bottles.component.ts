import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Bottle} from '../../shared/domain/bottle.model';
import {BottleService} from '../../shared/services/bottle.service';

@Component({
    selector: 'app-bottles',
    templateUrl: './bottles.component.html',
    styleUrls: ['./bottles.component.scss']
})
export class BottlesComponent implements OnInit {
    bottles: Observable<Bottle[]>;

    constructor(private bottleService: BottleService) {
    }

    ngOnInit(): void {
        this.bottles = this.bottleService.bottles$;
    }

    changePageSize(pageSize: number) {
        // eslint-disable-next-line no-console
        console.log('change page size:', pageSize);
        this.bottleService.updatePagination(pageSize);
    }
}
