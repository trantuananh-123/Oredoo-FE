import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/post';
@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    getAllByUserId(body: any): Observable<any> {
        return this.http.post(`${BASE_URL}/get-all-by-user-id`, body);
    }

    save(body: any): Observable<any> {
        return this.http.post(`${BASE_URL}/save`, body);
    }
}
