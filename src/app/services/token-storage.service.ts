import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    saveToken(token: string, isRemmeber: any) {
        if (isRemmeber) {
            window.localStorage.removeItem(TOKEN_KEY);
            window.localStorage.setItem(TOKEN_KEY, token);
        }
        else {
            window.sessionStorage.removeItem(TOKEN_KEY);
            window.sessionStorage.setItem(TOKEN_KEY, token);
        }
    }

    getToken() {
        return window.sessionStorage.getItem(TOKEN_KEY) != null ? window.sessionStorage.getItem(TOKEN_KEY) : window.localStorage.getItem(TOKEN_KEY);
    }

}
