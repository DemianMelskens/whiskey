import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pagination} from '../../../shared/domain/pagination.model';
import {Observable} from 'rxjs';
import {PageDto} from '../../../shared/clients/dtos/page/page.dto';
import {Distillery} from '../models/distillery.model';
import {take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DistilleryClient {

    private readonly BASE_URL = environment.apiUrl + '/distilleries';

    constructor(private http: HttpClient) {
    }

    public findDistilleries(criteria: string, pagination: Pagination): Observable<PageDto<Distillery>> {
        const params = this.buildParams(criteria, pagination);
        return this.http.get<PageDto<Distillery>>(`${this.BASE_URL}`, {params}).pipe(take(1));
    }

    buildParams(criteria: string, pagination: Pagination): HttpParams {
        return new HttpParams()
            .append('criteria', criteria)
            .append('pageSize', pagination.pageSize.toString())
            .append('currentPage', pagination.currentPage.toString());
    }
}
