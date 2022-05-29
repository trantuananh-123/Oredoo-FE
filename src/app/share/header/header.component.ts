import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    avatar!: String;
    defaultAvatar: String = '../../../assets/img/default_avatar.png';
    username!: String;
    isAdmin: boolean = false;

    constructor(private userService: UserService, private authService: AuthService, private globalService: GlobalService, private router: Router) {
        this.globalService.setUsername(this.userService.getUserName());
        this.globalService.setAvatar('../../../assets/img/default_avatar.png');
    }

    ngOnInit(): void {
        this.globalService.username.subscribe(username => {
            this.username = username;
        });
        this.globalService.avatar.subscribe(avatar => {
            this.avatar = avatar;
        });
        this.globalService.isAdmin.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
            console.log(isAdmin);
        });
    }

    logOut() {
        this.userService.logOut();
        if (this.router.url.includes('/home')) {
            window.location.reload();
        }
        this.router.navigateByUrl('/');
    }

}
