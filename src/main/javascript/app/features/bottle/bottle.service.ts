import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, pluck, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../../shared/domain/pagination.model';
import {Bottle} from './models/bottle.model';
import {BottleClient} from './clients/bottle.client';
import {LoadingService} from '../../shared/services/loading.service';
import {BottleState} from './state/bottle.state';

@Injectable({providedIn: 'root'})
export class BottleService {

    public bottles$ = this.bottleState._state$.pipe(pluck('bottles'), distinctUntilChanged());
    public pageSize$ = this.bottleState._state$.pipe(pluck('pagination', 'pageSize'), distinctUntilChanged());
    public currentPage$ = this.bottleState._state$.pipe(pluck('pagination', 'currentPage'), distinctUntilChanged());
    public pagination$ = this.bottleState._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this.bottleState._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private bottleClient: BottleClient,
        private bottleState: BottleState,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findBottles(criteria, this.bottleState.getSnapshot().pagination);
            })
        ).subscribe(bottles => {
            this.bottleState.updateBottles(bottles);
            this.loadingService.updateLoading(false);
        });
    }

    public updateBottles(bottles: Bottle[]): void {
        this.bottleState.updateBottles(bottles);
        this.loadingService.updateLoading(true);
    }

    public updateSearchCriteria(criteria: string): void {
        this.bottleState.updateSearchCriteria(criteria);
        this.loadingService.updateLoading(true);
    }

    public updatePageSize(pageSize: number): void {
        this.bottleState.updatePageSize(pageSize);
        this.loadingService.updateLoading(true);
    }

    public updateCurrentPage(currentPage: number = 0): void {
        this.bottleState.updateCurrentPage(currentPage);
        this.loadingService.updateLoading(true);
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

}
