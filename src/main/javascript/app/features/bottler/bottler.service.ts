import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, pluck, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../../shared/domain/pagination.model';
import {BottlerClient} from './clients/bottler.client';
import {Bottler} from './models/bottler.model';
import {LoadingService} from '../../shared/services/loading.service';
import {BottlerState} from './state/bottler.state';

@Injectable({providedIn: 'root'})
export class BottlerService {
    public bottlers$ = this.bottlerState._state$.pipe(pluck('bottlers'), distinctUntilChanged());
    public pageSize$ = this.bottlerState._state$.pipe(pluck('pagination', 'pageSize'), distinctUntilChanged());
    public currentPage$ = this.bottlerState._state$.pipe(pluck('pagination', 'currentPage'), distinctUntilChanged());
    public pagination$ = this.bottlerState._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this.bottlerState._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private bottlerClient: BottlerClient,
        private bottlerState: BottlerState,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findBottlers(criteria, this.bottlerState.getSnapshot().pagination);
            })
        ).subscribe(bottlers => {
            this.bottlerState.updateBottles(bottlers);
            this.loadingService.updateLoading(false);
        });
    }

    public updateSearchCriteria(criteria: string) {
        this.bottlerState.updateSearchCriteria(criteria);
        this.loadingService.updateLoading(true);
    }

    public updatePageSize(pageSize: number) {
        this.bottlerState.updatePageSize(pageSize);
        this.loadingService.updateLoading(true);
    }

    public updateCurrentPage(currentPage: number = 0) {
        this.bottlerState.updateCurrentPage(currentPage);
        this.loadingService.updateLoading(true);
    }

    private findBottlers(criteria: string, pagination: Pagination): Observable<Bottler[]> {
        return this.bottlerClient.findBottlers(criteria, pagination).pipe(
            tap(page => {
                this.bottlerState.updatePagination({
                    ...this.bottlerState.getSnapshot().pagination,
                    totalPages: page.totalPages
                });
            }),
            map(page => page.items)
        );
    }
}
