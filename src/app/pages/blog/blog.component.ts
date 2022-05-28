import { createHostListener } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    page: number = 0;

    postList: any = [];
    categoryList: any = [];
    tagList: any = [];
    topPostList: any = [];

    constructor(private postService: PostService, private categoryService: CategoryService, private tagService: TagService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.spinner.show();
        this.getAllPost();
        this.getAllCategory();
        this.getAllTag();
        this.getTopPost();
        setTimeout(() => {
            this.spinner.hide();
        }, 1500);
    }

    getAllPost() {
        this.postService.getAll().subscribe((data: any) => {
            this.postList = data.data;
        });
    }

    getAllCategory() {
        this.categoryService.getAll().subscribe((data: any) => {
            this.categoryList = data.data;
        });
    }

    getAllTag() {
        this.tagService.getAll().subscribe((data: any) => {
            this.tagList = data.data;
        });
    }

    getTopPost() {
        this.postService.getTop4ByRate().subscribe((data: any) => {
            this.topPostList = data.data.filter((post: any) => post.isActive);
        });
    }

    scrollTo(el: Element) {
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    scrollTop() {
        const firstElement = document.querySelector('.post-list');
        this.scrollTo(firstElement!);
    }

}
