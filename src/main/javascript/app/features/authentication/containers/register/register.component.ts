import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from '../../authentication.service';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
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

    get email(): AbstractControl {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    get firstName(): AbstractControl {
        return this.loginForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.loginForm.get('lastName');
    }

    setErrors(errors: any): void {
        this.invalidCredentials = true;
        this.username.setErrors(errors);
        this.password.setErrors(errors);
        this.email.setErrors(errors);
        this.firstName.setErrors(errors);
        this.lastName.setErrors(errors);
    }

    onSubmit(): void {
        this.authenticationService.register(
            this.username.value,
            this.email.value,
            this.password.value,
            this.firstName.value,
            this.lastName.value
        ).pipe(
            untilDestroyed(this)
        ).subscribe(
            () => {
                this.router.navigate(['/auth/login']);
            },
            () => {
                this.setErrors({wrong: {message: 'username or password was wrong'}});
            }
        );
    }
}
