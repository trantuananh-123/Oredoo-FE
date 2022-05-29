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
        this.globalService.setIsAdmin(this.authService.isAdmin());
        this.authService.getById(this.userService.getUserId()).subscribe((data: any) => {
            this.globalService.avatar.next(data.data.avatar);
        });
    }

    ngOnInit(): void {
        this.globalService.username.subscribe(username => {
            this.username = username;
        });
        this.globalService.isAdmin.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
            console.log(isAdmin);
        }); this.globalService.avatar.subscribe(avatar => {
            this.avatar = avatar;
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
