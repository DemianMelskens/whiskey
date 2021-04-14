import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {distinctUntilChanged, pluck, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from '@angular/router';
import {AuthenticationService} from "../../features/authentication/authentication.service";
import {UserState} from '../state/user.state';


@Injectable({providedIn: 'root'})
export class UserService {

    public currentUser$ = this.userState._state$.pipe(pluck('user'), distinctUntilChanged());

    constructor(
        private router: Router,
        private userClient: UserClient,
        private userState: UserState,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.token$.pipe(
            switchMap(token => token !== null ? this.getCurrentUser() : of(null)),
        ).subscribe(user => this.updateUser(user));
    }

    public getCurrentUser(): Observable<User> {
        return this.userClient.getCurrentUser();
    }

    public updateUser(user: User | null): void {
        this.userState.updateUser(user);
    }
}
