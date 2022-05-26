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

const MATERIAL_MODULE = [MatFormFieldModule, MatCardModule];
const FORM_MODULE = [ReactiveFormsModule, FormsModule];
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
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CarouselModule,
        InstagramComponent,
        FORM_MODULE,
        MATERIAL_MODULE
    ]
})
export class ShareModule { }
