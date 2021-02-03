import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, pluck, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../domain/pagination.model';
import {BottlerClient} from '../clients/bottler.client';
import {Bottler} from '../domain/bottler.model';
import {LoadingService} from './loading.service';

export interface BottlerState {
    bottlers: Bottler[];
    pagination: Pagination;
    criteria: string;
}

let _state: BottlerState = {
    bottlers: [],
    pagination: {
        currentPage: 0,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        totalPages: 0
    },
    criteria: ''
}

@Injectable({providedIn: 'root'})
export class BottlerService {
    private _store = new BehaviorSubject<BottlerState>(_state);
    private _state$ = this._store.asObservable();

    public bottlers$ = this._state$.pipe(pluck('bottlers'), distinctUntilChanged());
    public pageSize$ = this._state$.pipe(pluck('pagination','pageSize'), distinctUntilChanged());
    public currentPage$ = this._state$.pipe(pluck('pagination','currentPage'), distinctUntilChanged());
    public pagination$ = this._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private bottlerClient: BottlerClient,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findBottlers(criteria, _state.pagination);
            })
        ).subscribe(bottlers => {
            this.updateState({..._state, bottlers});
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

    private findBottlers(criteria: string, pagination: Pagination): Observable<Bottler[]> {
        return this.bottlerClient.findBottlers(criteria, pagination).pipe(
            tap(page => {
                const pagination = {..._state.pagination, totalPages: page.totalPages};
                this.updateState({..._state, pagination});
            }),
            map(page => page.items)
        );
    }

    private updateState(state: BottlerState) {
        this._store.next(_state = state);
    }
}
