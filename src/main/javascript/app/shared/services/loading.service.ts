import {Injectable} from '@angular/core';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {LoadingState} from '../state/loading.state';


@Injectable({providedIn: 'root'})
export class LoadingService {

    public loading$ = this.loadingState._state$.pipe(pluck('loading'), distinctUntilChanged());

    constructor(private loadingState: LoadingState) {
    }

    updateLoading(loading: boolean): void {
        this.loadingState.changeLoading(loading);
    }
}
