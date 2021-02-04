import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, distinctUntilChanged, pluck, switchMap} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
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
            switchMap(token => this.getCurrentUser(token)),
        ).subscribe(user => this.updateUser(user));
    }

    public getCurrentUser(token: string): Observable<User> {
        if (token != null) {
            return this.userClient.getCurrentUser().pipe(
                catchError(err => {
                    this.logout();
                    return throwError(err);
                })
            );
        }
        return of(null);
    }

    public updateUser(user: User | null): void {
        this.userState.updateUser(user);
    }

    public logout() {
        this.authenticationService.removeToken();
    }


}
