import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Blog } from '../../models/blog';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { CreateBlogComponent } from '../create-blog/create-blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];
  datepipe = new DatePipe('en-US');
  currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(
    private blogService: BlogService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  editBlog(id: number) {
    const modelRef = this.modalService.open(EditBlogComponent);
    modelRef.componentInstance.blogId = id;
    modelRef.result.then(() => {
      this.loadBlogs();
    });
  }

  createBlog() {
    const modelRef = this.modalService.open(CreateBlogComponent);
    modelRef.result.then(() => {
      this.loadBlogs();
    });
  }

  deleteBlog(id: number) {
    var result = confirm("Are you sure you want to delete?");
    if (!result) {
      return;
    }
    this.blogService.deleteBlog(id).subscribe(
      (data) => {
        if (data) {
          alert('Blog deleted successfully');
        }
        this.loadBlogs();
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
        console.log('Error while deleting blog : ' + error.toString());
        return;
      }
    );
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe(
      (data) => {
        this.blogs = data;
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
        console.log('Error while reading blogs : ' + error.toString());
        return;
      }
    );
  }
}
