import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomeDateValidators } from 'src/app/directive/after-date';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-post-category-dialog',
    templateUrl: './post-category-dialog.component.html',
    styleUrls: ['./post-category-dialog.component.scss']
})
export class PostCategoryDialogComponent implements OnInit {

    @ViewChild('fileInput', { static: false }) myFileInput!: ElementRef;

    isSubmitted: boolean = false;
    postCateForm!: FormGroup;
    selectedFile!: FileList;

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

    constructor(private fb: FormBuilder, private fileService: FileService, private categoryService: CategoryService, private spinner: SpinnerService, private toastr: ToastrService, public dialogRef: MatDialogRef<PostCategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.initForm();
        if (this.data.name === 'Edit') {
            this.postCateForm.patchValue(this.data.data);
        }
    }

    initForm() {
        this.postCateForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            createdDate: [{ value: '', disabled: this.data.data != null ? true : false }, Validators.required],
            isActive: ['', Validators.required],
            image: ['']
        }, {
            validators: [
                CustomeDateValidators.startDate('createdDate'),
            ]
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
            image: this.form.image.value
        }
    }

    selectFile(event: any) {
        this.selectedFile = event.target.files;
    }

    save() {
        this.isSubmitted = true;
        const body = this.setBodyRequest();
        console.log(body);
        if (this.postCateForm.valid) {
            this.spinner.show();
            if (this.selectedFile != null) {
                this.fileService.upload(this.selectedFile[0]).subscribe((data: any) => {
                    body["image"] = data.data.imageUrl;
                    this.categoryService.save(body).subscribe((data: any) => {
                        console.log(data);
                        this.toastr.success('Edit category successfully', 'Success');
                        this.dialogRef.close(true);
                    }, () => {
                        this.toastr.error('Edit category failed', 'Error');
                    });
                });
            } else {
                this.categoryService.save(body).subscribe((data: any) => {
                    console.log(data);
                    this.toastr.success('Edit category successfully', 'Success');
                    this.dialogRef.close(true);
                }, () => {
                    this.toastr.error('Edit category failed', 'Error');
                })
            }
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
