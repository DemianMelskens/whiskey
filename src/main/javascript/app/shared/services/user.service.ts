import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {BehaviorSubject, of} from "rxjs";
import {TokenService} from "./token.service";

export interface UserState {
    user: User;
}

let _state: UserState = {
    user: null
}

@Injectable({providedIn: 'root'})
export class UserService {
    private _store = new BehaviorSubject<UserState>(_state);
    private _state$ = this._store.asObservable();

    currentUser$ = this._state$.pipe(map(state => state.user), distinctUntilChanged());

    constructor(private userClient: UserClient, private tokenService: TokenService) {
        this.tokenService.token$.pipe(
            switchMap(() => {
                return this.userClient.getCurrentUser().pipe(
                    catchError(() => of(null))
                );
            })
        ).subscribe(user => this.updateState({..._state, user}))
    }

    private updateState(state: UserState): void {
        this._store.next(_state = state);
    }
}
