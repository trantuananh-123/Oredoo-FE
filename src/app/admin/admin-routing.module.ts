import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCategoryManagementComponent } from './post-category-management/post-category-management.component';
import { PostManagementComponent } from './post-management/post-management.component';

const routes: Routes = [
    {
        path: 'post-management',
        component: PostManagementComponent
    },
    {
        path: 'post-cate-management',
        component: PostCategoryManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
