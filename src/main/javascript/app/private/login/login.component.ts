import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserService} from '../../shared/services/user.service';

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

    constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
        this.loginForm.setErrors(errors);
        this.username.setErrors(errors);
        this.password.setErrors(errors);
    }

    onSubmit(): void {
        this.userService.authenticate(
            this.loginForm.controls.username.value,
            this.loginForm.controls.password.value
        ).subscribe(
            () => {}, //TODO: route to next page
            () => {
                this.setErrors({wrong: {message: 'username or password was wrong'}});
            }
        )
    }
}
