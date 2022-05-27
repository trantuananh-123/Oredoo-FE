import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/services/file.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-my-post',
    templateUrl: './my-post.component.html',
    styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

    panelOpenState: boolean = false;

    isSubmitted: boolean = false;

    postForm!: FormGroup;

    postList: any = [];

    selectedFile!: FileList;

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '350px',
        minHeight: '350px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: 'times-new-roman',
        defaultFontSize: '',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' }
        ],
        sanitize: true,
        toolbarPosition: 'top',
    }

    constructor(private postService: PostService, private fileSerivce: FileService, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getAll();
    }

    getAll() {
        let body = {
            "userId": this.userService.getUserId()
        }
        this.postService.getAllByUserId(body).subscribe((data: any) => {
            this.postList = data.data;
            console.log(data);
        });
    }

    initForm() {
        this.postForm = this.fb.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            content: [null, Validators.required],
            userId: [this.userService.getUserId()]
        });
    }

    get form() {
        return this.postForm.controls;
    }

    setBodyRequest() {
        return {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
            content: this.postForm.value.content,
            userId: this.postForm.value.userId,
            image: ''
        }
    }

    selectFile(event: any) {
        this.selectedFile = event.target.files;
    }

    post() {
        this.isSubmitted = true;
        let body = this.setBodyRequest();
        if (this.postForm.valid) {
            this.fileSerivce.upload(this.selectedFile[0]).subscribe((data: any) => {
                console.log(data.data.imageUrl);
                body["image"] = data.data.imageUrl;
                console.log(body);
                this.postService.save(body).subscribe((data: any) => {
                    this.getAll();
                    this.postForm.reset();
                    this.closePanel();
                    this.toastr.success("Post successfully", 'Error');
                }, (error: any) => {
                    this.toastr.error(error.error.message, 'Error');
                });
            }, (error: any) => {
                this.toastr.error(error.error.message, 'Error');
            });
        }
        else {
            if (this.form.title.errors?.required) {
                this.toastr.warning('Title is required', 'Warning');
            } else if (this.form.description.errors?.required) {
                this.toastr.warning('Description is required', 'Warning');
            } else if (this.form.content.errors?.required) {
                this.toastr.warning('Content is required', 'Warning');
            }
        }
    }

    setState(state: boolean) {
        this.panelOpenState = state;
    }

    closePanel() {
        this.panelOpenState = false;
    }

}
