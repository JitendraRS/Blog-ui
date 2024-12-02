import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { BlogEditorComponent } from '../../components/blog-editor/blog-editor.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BlogEditorComponent,
  ],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup;
  @Input() blogId: number = 0;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    public activeModal: NgbActiveModal
  ) {
    this.blogForm = this.fb.group({
      id: [0],
      text: ['', [Validators.required]],
      userName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.blogId > 0) {
      this.blogService.getBlogById(this.blogId).subscribe((data) => {
        if (data != null) {
          this.blogForm.setValue({
            id: data.id,
            text: data.text,
            userName: data.userName,
          });
        }
      });
    }
  }

  updateBlog(updatedBlog: Blog) {
    this.blogService.updateBlog(updatedBlog).subscribe(
      (data) => {
        alert('Blog updated successfully');
        this.activeModal.close();
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
        console.log('Error updating blog : ' + error.toString());
        return;
      }
    );
  }
}
