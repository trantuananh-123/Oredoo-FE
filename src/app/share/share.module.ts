import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { HeaderComponent } from '../share/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InstagramComponent } from './instagram/instagram.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularEditorModule } from '@kolkov/angular-editor';

const MATERIAL_MODULE = [MatFormFieldModule, MatCardModule, MatExpansionModule];
const FORM_MODULE = [ReactiveFormsModule, FormsModule];
const EDITOR_MODULE = [AngularEditorModule];
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        InstagramComponent,
    ],
    imports: [
        CommonModule,
        ShareRoutingModule,
        ReactiveFormsModule,
        FORM_MODULE,
        MATERIAL_MODULE,
        EDITOR_MODULE,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CarouselModule,
        InstagramComponent,
        FORM_MODULE,
        MATERIAL_MODULE,
        EDITOR_MODULE
    ]
})
export class ShareModule { }
