import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BlogService } from '../../services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Blog } from '../../models/blog';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
import { PLATFORM_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let blogService: jasmine.SpyObj<BlogService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async(() => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', [
      'getAllBlogs',
      'deleteBlog',
    ]);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: BlogService, useClass: BlogServiceMock },
        { provide: NgbModal, useValue: modalServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
        DatePipe,
      ],
    }).compileComponents();

    blogService = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogs on init', () => {

    component.ngOnInit();

    expect(component.blogs.length).toBeGreaterThan(0);
  });

  it('should open edit blog modal', () => {
    const modalRef = {
      componentInstance: { blogId: 1 },
      result: Promise.resolve(),
    };
    modalService.open.and.returnValue(modalRef as any);

    component.editBlog(1);

    expect(modalService.open).toHaveBeenCalledWith(EditBlogComponent);
    expect(modalRef.componentInstance.blogId).toBe(1);
  });

  it('should open create blog modal', () => {
    const modalRef = { result: Promise.resolve() };
    modalService.open.and.returnValue(modalRef as any);

    component.createBlog();

    expect(modalService.open).toHaveBeenCalledWith(CreateBlogComponent);
  });

  it('should delete blog', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'showAlert');

    component.deleteBlog(1);

    expect(component.showAlert).toHaveBeenCalledWith(
      'Blog deleted successfully'
    );
  });

  it('should show alert if isBrowser is true', () => {
    spyOn(window, 'alert');
    component.isBrowser = true;

    component.showAlert('Test message');

    expect(window.alert).toHaveBeenCalledWith('Test message');
  });

  it('should not show alert if isBrowser is false', () => {
    spyOn(window, 'alert');
    component.isBrowser = false;

    component.showAlert('Test message');

    expect(window.alert).not.toHaveBeenCalled();
  });
});

export class BlogServiceMock {
  getAllBlogs(): Observable<Blog[]> {
    return of([
      {
        id: 1,
        text: 'Test Blog',
        userName: 'Test Content',
        dateCreated: new Date()
      }
    ]);
  }

  deleteBlog(): Observable<boolean>{
    return of(true);
  }
}
