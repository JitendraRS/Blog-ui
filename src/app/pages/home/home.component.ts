import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];
  datepipe=new DatePipe('en-US');
  currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  editBlog(id: number) {
    this.router.navigate(['/edit-blog', id]);
  }

  createBlog() {
    this.router.navigate(['/create-blog']);
  }

  deleteBlog(id: number) {
    this.blogService.deleteBlog(id).subscribe(data => {
      if(data) {
        alert('Blog deleted successfully');
      }
      this.blogService.getAllBlogs().subscribe(data => {
        this.blogs = data;
      });
    });
  }

}
