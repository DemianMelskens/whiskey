import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Pagination} from '../../../shared/domain/pagination.model';
import {Observable} from 'rxjs';
import {PageDto} from '../../../shared/clients/dtos/page/page.dto';
import {Bottler} from '../models/bottler.model';

@Injectable({providedIn: 'root'})
export class BottlerClient {

    private readonly BASE_URL = environment.apiUrl + '/bottlers';

    constructor(private http: HttpClient) {
    }

    public findBottlers(criteria: string, pagination: Pagination): Observable<PageDto<Bottler>> {
        const params = this.buildParams(criteria, pagination);
        return this.http.get<PageDto<Bottler>>(`${this.BASE_URL}`, {params});
    }

    buildParams(criteria: string, pagination: Pagination): HttpParams {
        return new HttpParams()
            .append('criteria', criteria)
            .append('pageSize', pagination.pageSize.toString())
            .append('currentPage', pagination.currentPage.toString());
    }
}
