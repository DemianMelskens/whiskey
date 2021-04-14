import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Pagination} from '../../../shared/domain/pagination.model';
import {PageDto} from '../../../shared/clients/dtos/page/page.dto';
import {Bottle} from '../models/bottle.model';
import {take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class BottleClient {

    private readonly BASE_URL = environment.apiUrl + '/bottles';

    constructor(private http: HttpClient) {
    }

    public findBottles(criteria: string, pagination: Pagination): Observable<PageDto<Bottle>> {
        const params = this.buildParams(criteria, pagination);
        return this.http.get<PageDto<Bottle>>(`${this.BASE_URL}`, {params}).pipe(take(1));
    }

    public getFavorites(): Observable<Bottle[]> {
        return this.http.get<Bottle[]>(`${this.BASE_URL}/favorites`).pipe(take(1));
    }

    public toggleFavorite(bottleId: number): Observable<any> {
        return this.http.post<void>(`${this.BASE_URL}/favorites/${bottleId}`, {}).pipe(take(1));
    }

    buildParams(criteria: string, pagination: Pagination): HttpParams {
        return new HttpParams()
            .append('criteria', criteria)
            .append('pageSize', pagination.pageSize.toString())
            .append('currentPage', pagination.currentPage.toString());
    }
}
