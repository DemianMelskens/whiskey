import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../domain/user.model";
import {catchError, tap} from "rxjs/operators";
import {TokenService} from "../services/token.service";

@Injectable({
    providedIn: 'root'
})
export class UserClient {

    private readonly BASE_URL = environment.apiUrl + '/users';

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.BASE_URL}/current`).pipe(
            catchError(() => of(null).pipe(
                tap(() => {
                    this.tokenService.removeToken();
                })
            ))
        );
    }
}
