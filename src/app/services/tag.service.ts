import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/tag/get-all`);
    }

    save(body: any): Observable<any> {
        return this.http.post(`${environment.BASE_URL}/tag/save`, body);
    }
}
