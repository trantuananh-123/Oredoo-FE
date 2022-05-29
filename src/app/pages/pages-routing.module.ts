import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthorsComponent } from './authors/authors.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MyPostComponent } from './my-post/my-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomepageComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        component: AuthorsComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog-detail/:id',
        component: BlogDetailComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'my-post',
        component: MyPostComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
