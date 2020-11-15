import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {Observable, Subject} from "rxjs";
import {switchMap} from 'rxjs/operators';
import {JwtDto} from '../../../shared/clients/dtos/user/jwt.dto';
import {SubscriptionComponent} from '../../../shared/components/base/subscription/subscription.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscriptionComponent implements OnInit {
    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
    invalidCredentials = false;

    onSubmit$: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.onSubmit$.pipe(
                switchMap(() => this.onSubmit())
            ).subscribe(
                () => {
                    this.router.navigate(['/private/admin/dashboard']);
                },
                () => {
                    this.setErrors({wrong: {message: 'username or password was wrong'}});
                }
            )
        );
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

    onSubmit(): Observable<JwtDto> {
        return this.authenticationService.authenticate(
            this.username.value,
            this.password.value
        )
    }
}
