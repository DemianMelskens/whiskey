import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../domain/user.model';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Role} from '../../domain/enums/role.enum';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent{
    currentUser: Observable<User>;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.userService.getCurrentUser();
    }

    toDashboard(): void {
        this.authenticationService.hasAuthority(Role.ADMIN).subscribe(isAdmin => {
            if (isAdmin) {
                this.router.navigate(['/private/admin/dashboard']);
            } else {
                this.router.navigate(['/private/user/dashboard']);
            }
        })
    }

    logout() {
        this.authenticationService.logout();
    }
}
