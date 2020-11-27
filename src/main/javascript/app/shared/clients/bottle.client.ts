import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Pagination} from '../domain/pagination.model';
import {BottlePageDto} from './dtos/bottle/bottle-page.dto';

@Injectable({providedIn: 'root'})
export class BottleClient {

    private readonly BASE_URL = environment.apiUrl + '/bottles';

    constructor(private http: HttpClient) {
    }

    public findBottles(criteria: string, pagination: Pagination): Observable<BottlePageDto> {
        const params = this.buildParams(criteria, pagination);
        return this.http.get<BottlePageDto>(`${this.BASE_URL}`, {params});
    }

    buildParams(criteria: string, pagination: Pagination): HttpParams {
        return new HttpParams()
            .append('criteria', criteria)
            .append('pageSize', pagination.pageSize.toString())
            .append('currentPage', pagination.currentPage.toString());
    }
}
