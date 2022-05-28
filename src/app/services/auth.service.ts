import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(body: any): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/user/login`, body);
    }

    signUp(body: any): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/user/sign-up`, body);
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('token') != null;
    }
}
