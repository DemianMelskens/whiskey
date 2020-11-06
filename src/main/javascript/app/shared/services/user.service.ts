import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {BehaviorSubject, combineLatest} from "rxjs";

export interface UserState {
    user: User;
}

let _state: UserState = {
    user: null
}

@Injectable({providedIn: 'root'})
export class UserService {
    private store = new BehaviorSubject<UserState>(_state);
    private state$ = this.store.asObservable();

    currentUser$ = this.state$.pipe(map(state => state.user), distinctUntilChanged());

    constructor(private userClient: UserClient) {
        combineLatest([this.currentUser$]).pipe(
            switchMap(() => {
                return this.userClient.getCurrentUser();
            })
        ).subscribe(user => this.updateState({..._state, user}))
    }

    private updateState(state: UserState): void {
        this.store.next(_state = state);
    }
}
