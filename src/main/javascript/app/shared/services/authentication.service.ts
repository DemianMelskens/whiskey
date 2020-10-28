import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private _token?: string;

    constructor() {
    }

    isAuthenticated(): boolean {
        return this._token !== undefined;
    }

    setToken(token: string): void {
        this._token = token;
    }

    getToken(): string {
        return this._token;
    }
}
