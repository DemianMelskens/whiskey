import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {filter} from 'rxjs/operators';
import {cast} from './shared/operators/operators';
import {LoadingService} from './shared/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'whiskey';
    readonly blackListedUrl = [
        '/auth/login',
        '/auth/register'
    ]
    showMenu = true;
    loading$ = this.loadingService.loading$;


    constructor(
        private router: Router,
        private loadingService: LoadingService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => this.loadingService.updateLoading(true));

        this.router.events.pipe(
            filter(event => (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ))
        ).subscribe(() => this.loadingService.updateLoading(false));

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            cast(NavigationEnd)
        ).subscribe(event => this.showMenu = !this.blackListedUrl.includes(event.url));
    }
}
