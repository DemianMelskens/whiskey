import {Injectable} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {delayWhen, distinctUntilChanged, filter, map, mergeMap, pluck, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../../shared/domain/pagination.model';
import {Bottle} from './models/bottle.model';
import {BottleClient} from './clients/bottle.client';
import {LoadingService} from '../../shared/services/loading.service';
import {BottleState} from './state/bottle.state';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({providedIn: 'root'})
export class BottleService {

    //event subjects
    private readonly _onFavorite$$ = new Subject<Bottle>();

    public bottles$ = this.bottleState._state$.pipe(pluck('bottles'), distinctUntilChanged());
    public pageSize$ = this.bottleState._state$.pipe(pluck('pagination', 'pageSize'), distinctUntilChanged());
    public currentPage$ = this.bottleState._state$.pipe(pluck('pagination', 'currentPage'), distinctUntilChanged());
    public pagination$ = this.bottleState._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this.bottleState._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private bottleClient: BottleClient,
        private bottleState: BottleState,
        private authenticationService: AuthenticationService,
        private router: Router,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                this.loadingService.updateLoading(true);
                return this.findBottles(criteria, this.bottleState.getSnapshot().pagination);
            })
        ).subscribe(bottles => {
            this.updateBottles(bottles);
            this.loadingService.updateLoading(false);
        });

        this.authenticationService.authenticated$.pipe(
            switchMap(authenticated => authenticated ? this.getFavorites() : of([]))
        ).subscribe(favorites => {
            this.bottleState.applyFavorites(favorites);
        });

        combineLatest([this._onFavorite$$, this.authenticationService.authenticated$]).pipe(
            filter(([_, authenticated]) => authenticated),
            delayWhen(([bottle]) => this.bottleClient.toggleFavorite(bottle.id)),
            map(([bottle]) => bottle)
        ).subscribe(bottle => {
            bottle.favorite = !bottle.favorite;
            this.bottleState.updateBottle(bottle);
        })
    }

    public updateBottles(bottles: Bottle[]): void {
        this.bottleState.updateBottles(bottles);
    }

    public updateSearchCriteria(criteria: string): void {
        this.bottleState.updateSearchCriteria(criteria);
    }

    public updatePageSize(pageSize: number): void {
        this.bottleState.updatePageSize(pageSize);
    }

    public updateCurrentPage(currentPage: number = 0): void {
        this.bottleState.updateCurrentPage(currentPage);
    }

    public toggleFavorite(bottle: Bottle): void {
        this._onFavorite$$.next(bottle);
    }

    private findBottles(criteria: string, pagination: Pagination): Observable<Bottle[]> {
        return this.bottleClient.findBottles(criteria, pagination).pipe(
            tap(page => {
                this.bottleState.updatePagination({
                    ...this.bottleState.getSnapshot().pagination,
                    totalPages: page.totalPages
                });
            }),
            map(page => page.items)
        );
    }

    private getFavorites(): Observable<Bottle[]> {
        return this.bottleClient.getFavorites();
    }
}
