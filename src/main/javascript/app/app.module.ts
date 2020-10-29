import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from "./private/admin/admin.module";
import {PublicModule} from "./public/public.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PrivateModule} from "./private/private.module";
import {AuthenticationInterceptor} from "./shared/interceptors/authentication.interceptor";
import {HttpsInterceptor} from "./shared/interceptors/https.interceptor";

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true},
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AdminModule,
        PublicModule,
        PrivateModule
    ],
    providers: [
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
