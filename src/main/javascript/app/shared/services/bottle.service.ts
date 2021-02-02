import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../domain/pagination.model';
import {Bottle} from '../domain/bottle.model';
import {BottleClient} from '../clients/bottle.client';
import {LoadingService} from './loading.service';

export interface BottleState {
    bottles: Bottle[];
    pagination: Pagination;
    criteria: string;
}

let _state: BottleState = {
    bottles: [],
    pagination: {
        currentPage: 0,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        totalPages: 0
    },
    criteria: ''
}

@Injectable({providedIn: 'root'})
export class BottleService {
    private _store = new BehaviorSubject<BottleState>(_state);
    private _state$ = this._store.asObservable();

    public bottles$ = this._state$.pipe(map(state => state.bottles), distinctUntilChanged());
    public pageSize$ = this._state$.pipe(map(state => state.pagination.pageSize), distinctUntilChanged());
    public currentPage$ = this._state$.pipe(map(state => state.pagination.currentPage), distinctUntilChanged());
    public pagination$ = this._state$.pipe(map(state => state.pagination), distinctUntilChanged());
    public criteria$ = this._state$.pipe(map(state => state.criteria), distinctUntilChanged());

    constructor(
        private bottleClient: BottleClient,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findBottles(criteria, _state.pagination);
            })
        ).subscribe(bottles => {
            this.updateState({..._state, bottles});
            this.loadingService.changeLoading(false);
        });
    }

    public updateSearchCriteria(criteria: string) {
        this.updateState({..._state, criteria});
        this.loadingService.changeLoading(true);
    }

    public updatePageSize(pageSize: number) {
        const pagination = {..._state.pagination, pageSize};
        this.updateState({..._state, pagination});
        this.loadingService.changeLoading(true);
    }

    public updateCurrentPage(currentPage: number = 0) {
        const pagination = {..._state.pagination, currentPage};
        this.updateState({..._state, pagination});
        this.loadingService.changeLoading(true);
    }

    private findBottles(criteria: string, pagination: Pagination): Observable<Bottle[]> {
        return this.bottleClient.findBottles(criteria, pagination).pipe(
            tap(page => {
                const pagination = {..._state.pagination, totalPages: page.totalPages};
                this.updateState({..._state, pagination});
            }),
            map(page => page.items)
        );
    }

    private updateState(state: BottleState) {
        this._store.next(_state = state);
    }
}
