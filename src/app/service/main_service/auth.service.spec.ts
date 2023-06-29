import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, AUTH_API } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return an Observable<any>', () => {
      const username = 'testuser';
      const password = 'testpassword';
      const mockResponse = { success: true };

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(AUTH_API + 'signin');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });
      req.flush(mockResponse);
    });
  });

  describe('register', () => {
    it('should return an Observable<any>', () => {
      const username = 'testuser';
      const email = 'testemail@example.com';
      const password = 'testpassword';
      const mockResponse = { success: true };

      service.register(username, email, password).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(AUTH_API + 'signup');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, email, password });
      req.flush(mockResponse);
    });
  });
});
