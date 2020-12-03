import {MonoTypeOperatorFunction} from "rxjs";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

export function debug(name?: string): MonoTypeOperatorFunction<any> {
    return tap(object => {
        if (!environment.production) {
            console.debug(name ? name : '', object);
            console.trace();
        }
    });
}
