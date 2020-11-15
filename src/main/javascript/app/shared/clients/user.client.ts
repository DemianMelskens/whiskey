import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../domain/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserClient {

    private readonly BASE_URL = environment.apiUrl + '/users';

    constructor(
        private http: HttpClient,
    ) {
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.BASE_URL}/current`);
    }
}
