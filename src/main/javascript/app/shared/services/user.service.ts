import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, of} from "rxjs";
import {TokenService} from "./token.service";
import {Router} from '@angular/router';

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

    constructor(
        private router: Router,
        private userClient: UserClient,
        private tokenService: TokenService
    ) {
        this.tokenService.token$.pipe(
            filter(token => token !== null),
            switchMap(() => this.userClient.getCurrentUser().pipe(
                catchError(() => of(null).pipe(
                    tap(() => {
                        this.tokenService.removeToken();
                        this.router.navigate(['private', 'auth', 'login']);
                    })
                ))
            ))
        ).subscribe(user => this.updateState({..._state, user}))
    }

    public updateUser(user: User | null): void {
        this.updateState({..._state, user})
    }

    private updateState(state: UserState): void {
        this._store.next(_state = state);
    }
}
