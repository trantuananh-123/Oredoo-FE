import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalService } from 'src/app/services/global.service';
import { PostService } from 'src/app/services/post.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import { BlogDetailDialogComponent } from './blog-detail-dialog/blog-detail-dialog.component';

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

    avatar!: String;
    defaultAvatar: String = '../../../assets/img/default_avatar.png';

    postId!: any;
    post!: any;
    categoryName!: any;
    userId!: any;

    isAdmin: boolean = false;

    constructor(private _cdr: ChangeDetectorRef, private postService: PostService, private authService: AuthService, private userService: UserService, private spinner: SpinnerService, private activatedRoute: ActivatedRoute, private router: Router, private globalService: GlobalService, private categoryService: CategoryService, public dialog: MatDialog) {
        this.postId = this.activatedRoute.snapshot.params['id'];
        this.userId = this.userService.getUserId();
        this.globalService.isAdmin.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
        });
    }

    ngOnInit(): void {
        this.getPost();
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 1500);
    }

    getPost() {
        this.postService.getById(this.postId).subscribe((data: any) => {
            console.log(data.data);
            this.post = data.data;
            this.authService.getById(data.data.userId).subscribe((data: any) => {
                this.avatar = data.data.avatar;
            });
            const body = {
                "id": data.data.categoryId
            }
            this.categoryService.getById(body).subscribe((data: any) => {
                this.categoryName = data.data.name;
            });
        });
    }

    delete() {
        const body = {
            "id": this.postId
        }
        const dialogRef = this.dialog.open(BlogDetailDialogComponent, {
            data: {
                name: "Delete",
                data: body
            },
            width: '500px',
            height: '172px',
        });
        dialogRef.afterClosed().toPromise().then((result: any) => {
            if (result) {
                this.router.navigateByUrl('/my-post');
            }
        });
    }

    async edit() {
        const body = this.post;
        const dialogRef = this.dialog.open(BlogDetailDialogComponent, {
            data: {
                name: "Edit",
                data: body
            },
            width: '800px',
            height: '600px',
        });
        dialogRef.afterClosed().toPromise().then((result: any) => {
            if (result) {
                this.spinner.show();
                setTimeout(() => {
                    this.getPost();
                    this._cdr.detectChanges();
                }, 500);
                setTimeout(() => {
                    this.spinner.hide();
                }, 1500);
            }
        });
    }

}
