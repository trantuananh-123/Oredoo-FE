import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

const USER_NAME_KEY = 'user_name';
const USER_ID_KEY = 'user_id';
const USER_ROLE_KEY = 'user_role';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private globalService: GlobalService) { }

    logOut(): void {
        this.globalService.setUsername('');
        this.globalService.setAvatar('');
        this.globalService.setIsAdmin(false);
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

    saveUserRole(userRole: any) {
        window.sessionStorage.removeItem(USER_ROLE_KEY);
        window.sessionStorage.setItem(USER_ROLE_KEY, userRole);
    }

    getUserId() {
        const userId = window.sessionStorage.getItem(USER_ID_KEY);
        if (userId) {
            return userId;
        }
        return '';
    }
}
