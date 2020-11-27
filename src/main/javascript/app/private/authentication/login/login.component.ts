import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {Observable, Subject} from "rxjs";
import {switchMap} from 'rxjs/operators';
import {JwtDto} from '../../../shared/clients/dtos/user/jwt.dto';
import {SubscriptionComponent} from '../../../shared/components/base/subscription/subscription.component';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
    invalidCredentials = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
    }

    get username(): AbstractControl {
        return this.loginForm.get('username');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    setErrors(errors: any): void {
        this.invalidCredentials = true;
        this.username.setErrors(errors);
        this.password.setErrors(errors);
    }

    onSubmit(): void {
        this.authenticationService.authenticate(
            this.username.value,
            this.password.value
        ).pipe(
            untilDestroyed(this)
        ).subscribe(
            () => {
                this.router.navigate(['/private/admin/dashboard']);
            },
            () => {
                this.setErrors({wrong: {message: 'username or password was wrong'}});
            }
        );
    }
}
