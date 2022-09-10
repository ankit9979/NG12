import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './shared/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostAddComponent } from './post-add/post-add.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { PostEditComponent } from './post-edit/post-edit.component';
const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component : LoginComponent},
    {path:'signup', component : SignupComponent},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'edit-profile', component: UserProfileEditComponent, canActivate: [AuthGuard]},
    {path: 'create-post', component: PostAddComponent, canActivate: [AuthGuard]},
    {path:'posts', component : PostsComponent, canActivate: [AuthGuard]},
    {path:'posts/edit-post/:id', component : PostEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
