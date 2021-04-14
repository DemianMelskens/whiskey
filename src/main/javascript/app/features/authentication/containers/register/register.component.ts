import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from '../../authentication.service';
import {UntilDestroy} from "@ngneat/until-destroy";

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

    onSubmit(): void {
        this.authenticationService.register({
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value
        });
    }
}
