import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(body: any): Observable<any> {
        return this.http.post(`${BASE_URL}/login`, body);
    }

    signUp(body: any): Observable<any> {
        return this.http.post(`${BASE_URL}/sign-up`, body);
    }
}
