import { TestBed, async, inject } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Blog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BlogService]
    }); 
  });

  it('should ...', inject([BlogService], (service: BlogService) => {
    expect(service).toBeTruthy();
  }));
});
