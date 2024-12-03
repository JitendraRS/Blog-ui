import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: Object,
    private blogService: BlogService,
    private modalService: NgbModal
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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
          this.showAlert('Blog deleted successfully');
        }
        this.loadBlogs();
      },
      (error) => {
        this.showAlert('Something went wrong. Please try again later.');
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
        this.showAlert('Something went wrong. Please try again later.');
        console.log('Error while reading blogs : ' + error.toString());
        return;
      }
    );
  }

  showAlert(message: string) {
    if (this.isBrowser) {
      alert(message);
    }
  }
}
