import {Injectable} from '@angular/core';
import {UserClient} from '../clients/user.client';
import {User} from "../domain/user.model";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

    private _currentUser?: BehaviorSubject<User>;

    constructor(
        private userClient: UserClient
    ) {
        this._currentUser = new BehaviorSubject<User>(undefined);
    }

    public getCurrentUser(): Observable<User> {
        this.userClient.getCurrentUser().subscribe((user: User) => {
            this._currentUser.next(user)
        });
        return this._currentUser.asObservable();
    }

    public authenticateUser(): Observable<boolean> {
        return this.userClient.getCurrentUser().pipe(
            map((user: User) => {
                this._currentUser.next(user);
                return true;
            }),
            catchError(() => {
                return of(false);
            })
        );
    }
}
