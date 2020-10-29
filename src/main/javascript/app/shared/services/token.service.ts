import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {

    constructor() {
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
    }

    removeToken(): void{
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    getToken(): string {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
}
