import {MonoTypeOperatorFunction} from "rxjs";
import {map, tap} from "rxjs/operators";

/**
 * logs the values of a observable as its triggered
 * @param name
 */
export function debug(name?: string): MonoTypeOperatorFunction<any> {
    return tap(object => {
        console.debug(name ? name : '', object);
    });
}

/**
 * casts value to type
 * @param type
 */
export function cast<T>(type: T): MonoTypeOperatorFunction<any> {
    return map(object => object as T);
}
