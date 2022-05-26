import { Injectable } from '@angular/core';

const USER_KEY = 'user';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    signOut(): void {
        window.sessionStorage.clear();
    }

    saveUser(user: any) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser() {
        const username = window.sessionStorage.getItem(USER_KEY);
        if (username) {
            return username;
        }
        return '';
    }
}
