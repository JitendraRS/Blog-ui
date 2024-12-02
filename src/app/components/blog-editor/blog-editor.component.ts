import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
})
export class BlogEditorComponent implements OnInit {
  @Input() blogForm: any;
  @Output() onSubmitBlog = new EventEmitter<Blog>();

  constructor(private blogService: BlogService) {}

  get text() {
    return this.blogForm?.get('text');
  }

  get userName() {
    return this.blogForm?.get('userName');
  }

  ngOnInit() {
    const blogId = this.blogForm?.get('id')?.value ?? 0;
    if (blogId > 0) {
      this.blogService.getBlogById(blogId).subscribe((data) => {
        if (data != null) {
          this.blogForm?.patchValue({
            text: data.text,
            userName: data.userName,
          });
        }
      });
    }
  }

  submitBlog() {
    if (this.blogForm.invalid) {
      return;
    }
    this.onSubmitBlog.emit(this.blogForm.value as Blog);
  }
}
