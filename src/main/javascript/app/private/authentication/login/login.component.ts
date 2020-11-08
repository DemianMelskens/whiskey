import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {fromEvent, Observable} from 'rxjs';
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
    @ViewChild('form') element: ElementRef;

    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
    invalidCredentials = false;

    submit$: Observable<Event>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
    }

    ngAfterViewInit(): void {
        this.submit$ = fromEvent(this.element.nativeElement, 'submit');
        this.submit$.pipe(
            switchMap(() => this.authenticationService.authenticate(
                this.loginForm.controls.username.value,
                this.loginForm.controls.password.value
                )
            )
        ).subscribe(
            () => {
                this.router.navigate(['/private/admin/dashboard']);
            },
            () => {
                this.setErrors({wrong: {message: 'username or password was wrong'}});
            }
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
}
