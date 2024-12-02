import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'create-blog', component: CreateBlogComponent},
  { path: 'edit-blog/:id', component: EditBlogComponent}
];
