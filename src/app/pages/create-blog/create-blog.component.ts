import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogEditorComponent } from '../../components/blog-editor/blog-editor.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BlogEditorComponent,
  ],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;

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

  ngOnInit() {}

  createBlog(createdBlog: Blog) {
    this.blogService.createBlog(createdBlog).subscribe(
      (data) => {
        alert('Blog created successfully');
        this.activeModal.close();
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
        console.log('Error creating blog : ' + error.toString());
        return;
      }
    );
  }
}
