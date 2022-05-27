import { Component, OnInit } from '@angular/core';
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

    constructor(private userService: UserService, private globalService: GlobalService) {
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
    }

}
