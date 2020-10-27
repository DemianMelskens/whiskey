import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LoginDto} from "./dtos/user/login.dto";
import {JwtDto} from "./dtos/user/jwt.dto";
import {RegisterDto} from "./dtos/user/register.dto";

@Injectable({
  providedIn: 'root'
})
export class UserClient {

  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public authenticate(login: LoginDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(`${this.BASE_URL}/authenticate`, login);
  }

  public register(register: RegisterDto): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/register`, register);
  }
}
