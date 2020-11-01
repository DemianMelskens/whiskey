import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/services/authentication.service";

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
        private route: ActivatedRoute,
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

    clearErrors(): void {
        this.invalidCredentials = false;
        this.username.setErrors(null);
        this.password.setErrors(null);
    }

    onChange(): void {
        if (this.loginForm.invalid) {
            this.clearErrors();
        }
    }

    onSubmit(): void {
        this.authenticationService.authenticate(
            this.loginForm.controls.username.value,
            this.loginForm.controls.password.value
        ).subscribe(
            () => {
                this.router.navigate(['/private/admin/dashboard']);
            },
            () => {
                this.setErrors({wrong: {message: 'username or password was wrong'}});
            }
        )
    }
}
