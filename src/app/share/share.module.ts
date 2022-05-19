import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { HeaderComponent } from '../share/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InstagramComponent } from './instagram/instagram.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        InstagramComponent,
    ],
    imports: [
        CommonModule,
        ShareRoutingModule,
        CarouselModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CarouselModule,
        InstagramComponent
    ]
})
export class ShareModule { }
