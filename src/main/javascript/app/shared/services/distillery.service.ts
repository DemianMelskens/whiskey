import {Injectable} from '@angular/core';
import {Pagination} from '../domain/pagination.model';
import {Distillery} from '../domain/distillery.model';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {DistilleryClient} from '../clients/distillery.client';

export interface DistilleryState {
    distilleries: Distillery[];
    pagination: Pagination,
    criteria: string,
    loading: boolean,
}

let _state: DistilleryState = {
    distilleries: [],
    pagination: {
        currentPage: 0,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        totalPages: 0
    },
    criteria: '',
    loading: false
}

@Injectable({providedIn: 'root'})
export class DistilleryService {
    private _store = new BehaviorSubject<DistilleryState>(_state);
    private _state$ = this._store.asObservable();

    public distilleries$ = this._state$.pipe(map(state => state.distilleries), distinctUntilChanged());
    public pageSize$ = this._state$.pipe(map(state => state.pagination.pageSize), distinctUntilChanged());
    public currentPage$ = this._state$.pipe(map(state => state.pagination.currentPage), distinctUntilChanged());
    public pagination$ = this._state$.pipe(map(state => state.pagination), distinctUntilChanged());
    public criteria$ = this._state$.pipe(map(state => state.criteria), distinctUntilChanged());
    public loading$ = this._state$.pipe(map(state => state.loading), distinctUntilChanged());

    constructor(
        private distilleryClient: DistilleryClient
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findDistilleries(criteria, _state.pagination);
            })
        ).subscribe(distilleries => {
            this.updateState({..._state, distilleries, loading: false});
        });
    }

    public updateSearchCriteria(criteria: string) {
        this.updateState({..._state, criteria, loading: true});
    }

    public updatePageSize(pageSize: number) {
        const pagination = {..._state.pagination, pageSize};
        this.updateState({..._state, pagination, loading: true});
    }

    public updateCurrentPage(currentPage: number = 0) {
        const pagination = {..._state.pagination, currentPage};
        this.updateState({..._state, pagination, loading: true});
    }

    private findDistilleries(criteria: string, pagination: Pagination): Observable<Distillery[]> {
        return this.distilleryClient.findDistilleries(criteria, pagination).pipe(
            tap(page => {
                const pagination = {..._state.pagination, totalPages: page.totalPages};
                this.updateState({..._state, pagination});
            }),
            map(page => page.items)
        );
    }

    private updateState(state: DistilleryState) {
        this._store.next(_state = state);
    }

}
