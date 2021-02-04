import {Injectable} from '@angular/core';
import {Pagination} from '../../shared/domain/pagination.model';
import {Distillery} from './models/distillery.model';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, pluck, switchMap, tap} from 'rxjs/operators';
import {DistilleryClient} from './clients/distillery.client';
import {LoadingService} from '../../shared/services/loading.service';
import {DistilleryState} from './state/distillery.state';


@Injectable({providedIn: 'root'})
export class DistilleryService {

    public distilleries$ = this.distilleryState._state$.pipe(pluck('distilleries'), distinctUntilChanged());
    public pageSize$ = this.distilleryState._state$.pipe(pluck('pagination', 'pageSize'), distinctUntilChanged());
    public currentPage$ = this.distilleryState._state$.pipe(pluck('pagination', 'currentPage'), distinctUntilChanged());
    public pagination$ = this.distilleryState._state$.pipe(pluck('pagination'), distinctUntilChanged());
    public criteria$ = this.distilleryState._state$.pipe(pluck('criteria'), distinctUntilChanged());

    constructor(
        private distilleryClient: DistilleryClient,
        private distilleryState: DistilleryState,
        private loadingService: LoadingService
    ) {
        combineLatest([this.criteria$, this.pageSize$, this.currentPage$]).pipe(
            switchMap(([criteria]) => {
                return this.findDistilleries(criteria, this.distilleryState.getSnapshot().pagination);
            })
        ).subscribe(distilleries => {
            this.distilleryState.updateDistilleries(distilleries);
            this.loadingService.updateLoading(false);
        });
    }

    public updateSearchCriteria(criteria: string) {
        this.distilleryState.updateSearchCriteria(criteria);
        this.loadingService.updateLoading(true);
    }

    public updatePageSize(pageSize: number) {
        this.distilleryState.updatePageSize(pageSize);
        this.loadingService.updateLoading(true);
    }

    public updateCurrentPage(currentPage: number = 0) {
        this.distilleryState.updateCurrentPage(currentPage);
        this.loadingService.updateLoading(true);
    }

    private findDistilleries(criteria: string, pagination: Pagination): Observable<Distillery[]> {
        return this.distilleryClient.findDistilleries(criteria, pagination).pipe(
            tap(page => {
                this.distilleryState.updatePagination({
                    ...this.distilleryState.getSnapshot().pagination,
                    totalPages: page.totalPages
                });
            }),
            map(page => page.items)
        );
    }
}
