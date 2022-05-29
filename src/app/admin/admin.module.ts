import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PostManagementComponent } from './post-management/post-management.component';
import { ShareModule } from '../share/share.module';
import { PostCategoryManagementComponent } from './post-category-management/post-category-management.component';
import { PostCategoryDialogComponent } from './post-category-management/post-category-dialog/post-category-dialog.component';


@NgModule({
    declarations: [
        PostManagementComponent,
        PostCategoryManagementComponent,
        PostCategoryDialogComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ShareModule
    ]
})
export class AdminModule { }
