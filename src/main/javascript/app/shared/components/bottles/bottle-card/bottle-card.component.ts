import {Component, Input, OnInit} from '@angular/core';
import {Bottle} from '../../../domain/bottle.model';

@Component({
    selector: 'app-bottle-card',
    templateUrl: './bottle-card.component.html',
    styleUrls: ['./bottle-card.component.scss']
})
export class BottleCardComponent implements OnInit {

    @Input("bottle") bottle: Bottle;

    constructor() {
    }

    ngOnInit(): void {
    }
}
