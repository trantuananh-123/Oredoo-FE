import { Injectable } from '@angular/core';

const USER_NAME_KEY = 'user_name';
const USER_ID_KEY = 'user_id';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    signOut(): void {
        window.sessionStorage.clear();
    }

    saveUserName(username: any) {
        window.sessionStorage.removeItem(USER_NAME_KEY);
        window.sessionStorage.setItem(USER_NAME_KEY, username);
    }

    getUserName() {
        const username = window.sessionStorage.getItem(USER_NAME_KEY);
        if (username) {
            return username;
        }
        return '';
    }

    saveUserId(userId: any) {
        window.sessionStorage.removeItem(USER_ID_KEY);
        window.sessionStorage.setItem(USER_ID_KEY, userId);
    }

    getUserId() {
        const userId = window.sessionStorage.getItem(USER_ID_KEY);
        if (userId) {
            return userId;
        }
        return '';
    }
}
