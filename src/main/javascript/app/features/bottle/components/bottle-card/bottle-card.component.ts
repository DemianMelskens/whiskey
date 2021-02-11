import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bottle} from '../../models/bottle.model';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-bottle-card',
    templateUrl: './bottle-card.component.html',
    styleUrls: ['./bottle-card.component.scss']
})
export class BottleCardComponent implements OnInit {

    @Input("bottle") bottle: Bottle;
    @Output("toggleFavorite") favorite = new EventEmitter<Bottle>()
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

    toggleFavorite(bottle: Bottle): void {
        this.favorite.next(bottle);
    }
}
