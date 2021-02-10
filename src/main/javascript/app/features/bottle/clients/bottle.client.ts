import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Pagination} from '../../../shared/domain/pagination.model';
import {PageDto} from '../../../shared/clients/dtos/page/page.dto';
import {Bottle} from '../models/bottle.model';

@Injectable({providedIn: 'root'})
export class BottleClient {

    private readonly BASE_URL = environment.apiUrl + '/bottles';

    constructor(private http: HttpClient) {
    }

    public findBottles(criteria: string, pagination: Pagination): Observable<PageDto<Bottle>> {
        const params = this.buildParams(criteria, pagination);
        return this.http.get<PageDto<Bottle>>(`${this.BASE_URL}`, {params});
    }

    public addFavorite(bottleId: number): Observable<any> {
        return this.http.post<void>(`${this.BASE_URL}/favorites/${bottleId}`, {});
    }

    public removeFavorite(bottleId: number): Observable<any> {
        return this.http.delete(`${this.BASE_URL}/favorites/${bottleId}`);
    }

    buildParams(criteria: string, pagination: Pagination): HttpParams {
        return new HttpParams()
            .append('criteria', criteria)
            .append('pageSize', pagination.pageSize.toString())
            .append('currentPage', pagination.currentPage.toString());
    }
}
