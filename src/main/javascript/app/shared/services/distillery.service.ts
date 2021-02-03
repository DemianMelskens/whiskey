import {Injectable} from '@angular/core';
import {Pagination} from '../domain/pagination.model';
import {Distillery} from '../domain/distillery.model';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, pluck, switchMap, tap} from 'rxjs/operators';
import {DistilleryClient} from '../clients/distillery.client';
import {LoadingService} from './loading.service';

export interface DistilleryState {
    distilleries: Distillery[];
    pagination: Pagination;
    criteria: string;
}

let _state: DistilleryState = {
    distilleries: [],
    pagination: {
        currentPage: 0,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        totalPages: 0
    },
    criteria: ''
}

@Injectable({providedIn: 'root'})
export class DistilleryService {
    private _store = new BehaviorSubject<DistilleryState>(_state);
    private _state$ = this._store.asObservable();

    public distilleries$ = this._state$.pipe(pluck('distilleries'), distinctUntilChanged());
    public pageSize$ = this._state$.pipe(pluck('pagination', 'pageSize'), distinctUntilChanged());
    public currentPage$ = this._state$.pipe(pluck('pagination', 'currentPage'), distinctUntilChanged());
    public pagination$ = this._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private distilleryClient: DistilleryClient,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findDistilleries(criteria, _state.pagination);
            })
        ).subscribe(distilleries => {
            this.updateState({..._state, distilleries});
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
