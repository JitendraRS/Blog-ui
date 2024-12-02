import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiBaseUrl = '';
  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.blogApiUrl;
  }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiBaseUrl + '/blogs');
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.apiBaseUrl + '/blogs/' + id);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiBaseUrl + '/blogs', blog);
  }

  updateBlog(blog: Blog): Observable<boolean> {
    return this.http.put<boolean>(this.apiBaseUrl + '/blogs/' + blog.id, blog);
  }

  deleteBlog(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiBaseUrl + '/blogs/' + id);
  }

  // private getHttpOptions() {
  //   return {
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  // }

}
