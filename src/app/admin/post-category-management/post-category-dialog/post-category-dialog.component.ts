import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-post-category-dialog',
    templateUrl: './post-category-dialog.component.html',
    styleUrls: ['./post-category-dialog.component.scss']
})
export class PostCategoryDialogComponent implements OnInit {

    isSubmitted: boolean = false;
    postCateForm!: FormGroup;

    stateList = [
        {
            name: 'Active',
            value: true,
        },
        {
            name: 'Disabled',
            value: false,
        }
    ]

    constructor(private fb: FormBuilder, private categoryService: CategoryService, private spinner: SpinnerService, private toastr: ToastrService, public dialogRef: MatDialogRef<PostCategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.initForm();
        this.postCateForm.patchValue(this.data.data);
    }

    initForm() {
        this.postCateForm = this.fb.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            createdDate: [{ value: '', disabled: true }, Validators.required],
            isActive: ['', Validators.required],
        });
    }

    get form() {
        return this.postCateForm.controls;
    }

    setBodyRequest() {
        return {
            id: this.form.id.value,
            name: this.form.name.value,
            createdDate: this.form.createdDate.value,
            isActive: this.form.isActive.value,
        }
    }

    save() {
        this.isSubmitted = true;
        const body = this.setBodyRequest();
        console.log(body);
        if (this.postCateForm.valid) {
            this.spinner.show();
            this.categoryService.save(body).subscribe((data: any) => {
                console.log(data);
                this.toastr.success('Edit category successfully', 'Success');
                this.dialogRef.close(true);
            }, () => {
                this.toastr.error('Edit category failed', 'Error');
            })
        } else {
            this.toastr.warning('Please check all required field', 'Warning');
        }
        setTimeout(() => {
            this.spinner.hide();
        }, 1500);
    }

    delete() {
        this.isSubmitted = true;
        const body = { "id": this.postCateForm.value.id };
        console.log(body);
        if (this.postCateForm.valid) {
            this.spinner.show();
            this.categoryService.delete(body).subscribe((data: any) => {
                console.log(data);
                this.toastr.success('Edit category successfully', 'Success');
                this.dialogRef.close(true);
            }, () => {
                this.toastr.error('Edit category failed', 'Error');
            })
        } else {
            this.toastr.warning('Please check all required field', 'Warning');
        }
        setTimeout(() => {
            this.spinner.hide();
        }, 1500);
    }
}
