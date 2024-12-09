import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBlogComponent } from './create-blog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let blogService: BlogService;
  let activeModal: NgbActiveModal;

  beforeEach(async(() => {
    const blogServiceStub = {
      createBlog: jasmine.createSpy('createBlog').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      imports: [CreateBlogComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: BlogService, useValue: blogServiceStub },
        NgbActiveModal,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with three controls', () => {
    expect(component.blogForm.contains('id')).toBeTruthy();
    expect(component.blogForm.contains('text')).toBeTruthy();
    expect(component.blogForm.contains('userName')).toBeTruthy();
  });

  it('should make the text control required', () => {
    let control = component.blogForm.get('text');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the userName control required', () => {
    let control = component.blogForm.get('userName');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should call createBlog on the blogService when createBlog is called', () => {
    const blog: Blog = {
      id: 1,
      text: 'Test Blog',
      userName: 'Test User',
      dateCreated: new Date(),
    };
    component.createBlog(blog);
    expect(blogService.createBlog).toHaveBeenCalledWith(blog);
  });

  it('should close the modal on successful blog creation', () => {
    spyOn(activeModal, 'close');
    const blog: Blog = {
      id: 1,
      text: 'Test Blog',
      userName: 'Test User',
      dateCreated: new Date(),
    };
    component.createBlog(blog);
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should alert an error message on blog creation failure', () => {
    spyOn(window, 'alert');
    blogService.createBlog = jasmine
      .createSpy('createBlog')
      .and.returnValue(throwError('Error'));
    const blog: Blog = {
      id: 1,
      text: 'Test Blog',
      userName: 'Test User',
      dateCreated: new Date(),
    };
    component.createBlog(blog);
    expect(window.alert).toHaveBeenCalledWith(
      'Something went wrong. Please try again later.'
    );
  });
});
