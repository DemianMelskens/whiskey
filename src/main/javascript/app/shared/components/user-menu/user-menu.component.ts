import {Component, OnInit} from '@angular/core';
import {User} from '../../domain/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
    currentUser$: Observable<User>;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.userService.currentUser$;
    }

    toDashboard(): void {
        this.router.navigate(['/private/user/dashboard']);
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/private/auth/login'])
    }
}
