import {LoginComponent} from '../../../../../main/javascript/app/private/login/login.component';
import {UserService} from "../../../../../main/javascript/app/shared/services/user.service";
import {AbstractControl, ReactiveFormsModule} from "@angular/forms";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule
            ],
            providers: [UserService]
        }).compileComponents();

        userService = TestBed.inject(UserService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return username form control', () => {
        const result = component.username;
        expect(result).toBeInstanceOf(AbstractControl);
    });

    it('should return password form control', () => {
        const result = component.password;
        expect(result).toBeInstanceOf(AbstractControl);
    });

    it('should set errors on form', () => {
        component.setErrors({test: {message: 'this is a test error'}})
        expect(component.loginForm.errors.test.message).toEqual('this is a test error');
        expect(component.loginForm.get('username').errors.test.message).toEqual('this is a test error');
        expect(component.loginForm.get('password').errors.test.message).toEqual('this is a test error');
    });

    it('should submit form and succeed', () => {
        component.onSubmit()
    });

    it('should submit form and fail', () => {
        component.onSubmit()
    });
});
