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

}
