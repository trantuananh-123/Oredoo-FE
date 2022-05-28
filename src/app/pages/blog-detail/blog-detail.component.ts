import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalService } from 'src/app/services/global.service';
import { PostService } from 'src/app/services/post.service';
import { SpinnerService } from 'src/app/services/spinner.service';

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

    constructor(private postService: PostService, private spinner: SpinnerService, private activatedRoute: ActivatedRoute, private globalService: GlobalService, private categoryService: CategoryService) {
        this.postId = this.activatedRoute.snapshot.params['id'];
        this.getPost();
        this.globalService.avatar.subscribe(avatar => {
            this.avatar = avatar;
        });
    }

    ngOnInit(): void {
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 1500);
    }

    getPost() {
        this.postService.getById(this.postId).subscribe((data: any) => {
            this.post = data.data;
            const body = {
                "id": data.data.categoryId
            }
            this.categoryService.getById(body).subscribe((data: any) => {
                this.categoryName = data.data.name;
            });
        });
    }

}
