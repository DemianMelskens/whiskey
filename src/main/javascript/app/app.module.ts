import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from "./shared/interceptors/authentication.interceptor";
import {HttpsInterceptor} from "./shared/interceptors/https.interceptor";
import {SharedModule} from "./shared/shared.module";
import {BottlerModule} from './features/bottler/bottler.module';
import {BottleModule} from './features/bottle/bottle.module';
import {DistilleryModule} from './features/distillery/distillery.module';
import {AuthenticationModule} from './features/authentication/authentication.module';

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
        AuthenticationModule,
        BottlerModule,
        BottleModule,
        DistilleryModule,
        SharedModule
    ],
    providers: [
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
