import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogEditorComponent } from './blog-editor.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
describe('BlogEditorComponent', () => {
  let component: BlogEditorComponent;
  let fixture: ComponentFixture<BlogEditorComponent>;
  let blogServiceMock: any;
  let activeModalMock: any;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    blogServiceMock = {
      getBlogById: jasmine
        .createSpy('getBlogById')
        .and.returnValue(of({ text: 'Test text', userName: 'Test user' })),
    };

    activeModalMock = {
      dismiss: jasmine.createSpy('dismiss'),
    };

    TestBed.configureTestingModule({
      imports: [BlogEditorComponent,ReactiveFormsModule],
      providers: [
        { provide: BlogService, useValue: blogServiceMock },
        { provide: NgbActiveModal, useValue: activeModalMock },
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditorComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.blogForm = formBuilder.group({
      id: [1],
      text: [''],
      userName: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with blog data if blogId is greater than 0', () => {
    component.ngOnInit();
    expect(blogServiceMock.getBlogById).toHaveBeenCalledWith(1);
    expect(component.blogForm.value).toEqual({
      id: 1,
      text: 'Test text',
      userName: 'Test user',
    });
  });

  it('should emit onSubmitBlog event with form value when submitBlog is called', () => {
    spyOn(component.onSubmitBlog, 'emit');
    component.blogForm.patchValue({ text: 'New text', userName: 'New user'});
    component.submitBlog();
    expect(component.onSubmitBlog.emit).toHaveBeenCalledWith({
      id: 1,
      text: 'New text',
      userName: 'New user'
    } as Blog);
  });

  it('should dismiss the modal when cancel is called', () => {
    component.cancel();
    expect(activeModalMock.dismiss).toHaveBeenCalled();
  });
});
