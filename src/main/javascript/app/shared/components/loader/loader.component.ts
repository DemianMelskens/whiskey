import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


    constructor(router: Router) {
    }

    ngOnInit(): void {
    }

}