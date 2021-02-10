import {Component, Input, OnInit} from '@angular/core';
import {Bottle} from '../../models/bottle.model';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-bottle-card',
    templateUrl: './bottle-card.component.html',
    styleUrls: ['./bottle-card.component.scss']
})
export class BottleCardComponent implements OnInit {

    @Input("bottle") bottle: Bottle;
    showFavorite = new BehaviorSubject(false);

    constructor() {
    }

    ngOnInit(): void {
    }

    mouseEnter(): void {
        this.showFavorite.next(true);
    }

    mouseLeave(): void {
        this.showFavorite.next(this.bottle.favorite);
    }
}
