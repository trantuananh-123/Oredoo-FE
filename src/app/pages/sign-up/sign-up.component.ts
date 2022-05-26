import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    isSubmitted: boolean = false;
    isAgreed: boolean = false;

    signUpForm!: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.signUpForm = this.fb.group({
            username: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern('^[\\w._%+-]\+@[a-zA-Z]\+\\.[a-zA-Z]{2,6}\$')]],
            password: [null, Validators.required],
        });
    }

    get form() {
        return this.signUpForm.controls;
    }

    agree(event: any) {
        this.isAgreed = event.target.checked;
    }

    setBodyRequest() {
        return {
            username: this.signUpForm.value.username != null ? this.signUpForm.value.username : null,
            email: this.signUpForm.value.email != null ? this.signUpForm.value.email : null,
            password: this.signUpForm.value.password != null ? this.signUpForm.value.password : null,
            type: 1
        }
    }

    signUp() {
        this.isSubmitted = true;
        const body = this.setBodyRequest();
        if (this.signUpForm.valid) {
            this.authService.signUp(body).subscribe((data: any) => {
                console.log(data);
                this.toastr.success('Sign up successfully', 'Success');
                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 1000);
            }, (error: any) => {
                this.toastr.error(error.error.message, 'Error');
            });
        } else {
            if (this.form.username.errors?.required) {
                this.toastr.warning("Email is not valid", "Warning");
            } else {
                this.toastr.warning('Please fill all required fields', 'Warning');
            }
        }
    }

}
