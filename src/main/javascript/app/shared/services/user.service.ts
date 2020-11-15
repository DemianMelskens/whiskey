import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";

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

    public currentUser$ = this._state$.pipe(map(state => state.user), distinctUntilChanged());

    constructor(
        private router: Router,
        private userClient: UserClient,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.token$.pipe(
            filter(token => token !== null),
            switchMap(() => this.getCurrentUser())
        ).subscribe(user => this.updateUser(user));
    }

    public getCurrentUser(): Observable<User> {
        return this.userClient.getCurrentUser().pipe(
            catchError(() => of(null).pipe(
                tap(() => {
                    this.authenticationService.removeToken();
                })
            ))
        );
    }

    public updateUser(user: User | null): void {
        this.updateState({..._state, user})
    }

    private updateState(state: UserState): void {
        this._store.next(_state = state);
    }
}
