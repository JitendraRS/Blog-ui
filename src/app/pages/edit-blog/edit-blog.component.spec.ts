import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBlogComponent } from './edit-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
describe('EditBlogComponent', () => {
  let component: EditBlogComponent;
  let fixture: ComponentFixture<EditBlogComponent>;
  let blogService: BlogService;

  beforeEach(async(() => {
    const blogServiceMock = {
      getBlogById: jasmine.createSpy('getBlogById').and.returnValue(
        of({
          id: 1,
          text: 'Test Blog',
          userName: 'Test User',
        })
      ),
      updateBlog: jasmine.createSpy('updateBlog').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      imports: [EditBlogComponent, ReactiveFormsModule],
      providers: [
        { provide: BlogService, useValue: blogServiceMock },
        NgbActiveModal,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with blog data if blogId is greater than 0', () => {
    component.blogId = 1;
    component.ngOnInit();
    expect(blogService.getBlogById).toHaveBeenCalledWith(1);
    expect(component.blogForm.value).toEqual({
      id: 1,
      text: 'Test Blog',
      userName: 'Test User',
    });
  });

  it('should not initialize the form with blog data if blogId is 0', () => {
    component.blogId = 0;
    component.ngOnInit();
    expect(blogService.getBlogById).not.toHaveBeenCalled();
  });

  it('should call updateBlog and close the modal on successful update', () => {
    spyOn(window, 'alert');
    spyOn(component.activeModal, 'close');
    const updatedBlog = {
      id: 1,
      text: 'Updated Blog',
      userName: 'Updated User',
      dateCreated: new Date(),
    };
    component.updateBlog(updatedBlog);
    expect(blogService.updateBlog).toHaveBeenCalledWith(updatedBlog);
    expect(window.alert).toHaveBeenCalledWith('Blog updated successfully');
    expect(component.activeModal.close).toHaveBeenCalled();
  });

  it('should handle error on updateBlog failure', () => {
    spyOn(window, 'alert');
    blogService.updateBlog = jasmine
      .createSpy('updateBlog')
      .and.returnValue(throwError('Error'));
    const updatedBlog = {
      id: 1,
      text: 'Updated Blog',
      userName: 'Updated User',
      dateCreated: new Date(),
    };
    component.updateBlog(updatedBlog);
    expect(blogService.updateBlog).toHaveBeenCalledWith(updatedBlog);
    expect(window.alert).toHaveBeenCalledWith(
      'Something went wrong. Please try again later.'
    );
  });
});
