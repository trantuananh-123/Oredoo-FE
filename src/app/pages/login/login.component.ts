import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isSubmitted: boolean = false;

    loginForm!: FormGroup;
    isLoggedIn: boolean = false;
    isrememberMe: boolean = false;

    constructor(private authService: AuthService, private tokenService: TokenStorageService, private userService: UserService, private globalService: GlobalService, private fb: FormBuilder, private router: Router, private toastr: ToastrService, private spinner: SpinnerService) {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    ngOnInit(): void {
        this.initForm();
        if (this.isLoggedIn) {
            this.router.navigateByUrl('/');
        }
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    setBodyRequest() {
        return {
            username: this.loginForm.value.username != null ? this.loginForm.value.username : null,
            password: this.loginForm.value.password != null ? this.loginForm.value.password : null,
        }
    }

    login() {
        this.spinner.show();
        this.isSubmitted = true;
        const body = this.setBodyRequest();
        if (this.loginForm.valid) {
            this.authService.login(body).subscribe((data: any) => {
                this.tokenService.saveToken(data.data.token, this.isrememberMe);
                this.userService.saveUserName(data.data.username, this.isrememberMe);
                this.userService.saveUserId(data.data.id, this.isrememberMe);
                this.userService.saveUserRole(data.data.roles, this.isrememberMe);
                this.toastr.success('Login successfully', 'Success');
                setTimeout(() => {
                    this.globalService.setUsername(data.data.username);
                    this.globalService.setAvatar(data.data.avatar ? data.data.avatar : '../../../assets/img/default_avatar.png');
                    this.globalService.setIsAdmin(this.authService.isAdmin());
                    this.router.navigateByUrl('/home');
                    this.spinner.hide();
                }, 1000);
            }, (error: any) => {
                this.toastr.error(error.error.message, 'Error');
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000)
            });
        } else {
            if (this.form.username.errors?.required || this.form.password.errors?.required) {
                this.toastr.warning('Please fill all required fields', 'Warning');
            } else {
                this.toastr.error('Incorrect username or password', 'Error');
            }
        }
    }

    rememberMe(event: any) {
        this.isrememberMe = event.target.checked;
    }

}
