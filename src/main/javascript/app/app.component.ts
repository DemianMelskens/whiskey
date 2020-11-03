import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'whiskey';
    loading = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.checkEvent(event);
        });
    }

    private checkEvent(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }

        if (event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError) {
            this.loading = false;
        }
    }
}
