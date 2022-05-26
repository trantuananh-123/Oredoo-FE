import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
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

    constructor(private authService: AuthService, private tokenService: TokenStorageService, private userService: UserService, private globalService: GlobalService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.initForm();
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
        this.isSubmitted = true;
        const body = this.setBodyRequest();
        if (this.loginForm.valid) {
            this.authService.login(body).subscribe((data: any) => {
                this.tokenService.saveToken(data.data.token);
                this.userService.saveUser(data.data.username);
                this.toastr.success('Login successfully', 'Success');
                setTimeout(() => {
                    this.globalService.setUsername(data.data.username);
                    this.globalService.setAvatar(data.data.avatar ? data.data.avatar : '../../../assets/img/default_avatar.png');
                    this.router.navigateByUrl('/home');
                }, 1000);
            }, (error: any) => {
                this.toastr.error(error.error.message, 'Error');
            });
        } else {
            if (this.form.username.errors?.required || this.form.password.errors?.required) {
                this.toastr.warning('Please fill all required fields', 'Warning');
            } else {
                this.toastr.error('Incorrect username or password', 'Error');
            }
        }
    }

}