import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

    private _currentUser?: User;

    constructor(
        private userClient: UserClient
    ) {
    }

    public getCurrentUser(): User {
        return this._currentUser;
    }

    public authenticateUser(): Observable<boolean> {
        return this.userClient.getCurrentUser().pipe(
            map((user: User) => {
                this._currentUser = user;
                return true;
            }),
            catchError(() => {
                return of(false);
            })
        );
    }
}
