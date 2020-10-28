import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {UserClient} from '../clients/user.client';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {JwtDto} from '../clients/dtos/user/jwt.dto';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(
        private userClient: UserClient,
        private authenticationService: AuthenticationService
    ) {
    }

    public authenticate(username: string, password: string): Observable<JwtDto> {
        return this.userClient.authenticate({username, password, rememberMe: false}).pipe(
            tap(jwt => this.authenticationService.setToken(jwt.token))
        );
    }
}
