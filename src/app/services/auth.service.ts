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

    getAll(): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/user/get-all`);
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('token') != null;
    }

    upadte(body: any): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/user/update`, body);
    }

    getById(id: String): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/user/${id}`);
    }

    checkAdmin(id: String) {
        return this.http.get(`${environment.BASE_URL}/user/check-admin/${id}`);
    }

    isAdmin() {
        let userRoles = sessionStorage.getItem('user_role')!;
        if (userRoles != null && userRoles.includes('ROLE_ADMIN')) {
            return true;
        } else return false;
    }

    getAllAuthors() {
        return this.http.get(`${environment.BASE_URL}/user/all-authors`);
    }

    getUserByUsername(username: string): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/user/unique-name/${username}`);
    }

    getUserByEmail(email: string): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/user/unique-email/${email}`);
    }

    delete(body: String): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/user/delete`, body);
    }

    search(body: any): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/user/search`, body);
    }
}
