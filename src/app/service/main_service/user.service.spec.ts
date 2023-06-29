import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, API_URL } from './user.service';
import { User } from './../../models/user.model';
import { AccessRight } from './../../models/access-right.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPublicContent', () => {
    it('should return an Observable<any>', () => {
      const mockResponse = 'test response';
      service.getPublicContent().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(API_URL + '/all');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getUserBoard', () => {
    it('should return an Observable<User[]>', () => {
      const mockUsers: User[] = [
        { id: 1, username: 'John', email: 'john@example.com', accessRights: [] }
      ];
      service.getUserBoard().subscribe(users => {
        expect(users).toEqual(mockUsers);
      });
      const req = httpMock.expectOne(API_URL + '/user');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('getModeratorBoard', () => {
    it('should return an Observable<User[]>', () => {
      const mockUsers: User[] = [
        { id: 2, username: 'Jane', email: 'jane@example.com', accessRights: [] }
      ];
      service.getModeratorBoard().subscribe(users => {
        expect(users).toEqual(mockUsers);
      });
      const req = httpMock.expectOne(API_URL + '/mod');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('getAdminBoard', () => {
    it('should return an Observable<User[]>', () => {
      const mockUsers: User[] = [
        { id: 3, username: 'Bob', email: 'bob@example.com', accessRights: [] }
      ];
      service.getAdminBoard().subscribe(users => {
        expect(users).toEqual(mockUsers);
      });
      const req = httpMock.expectOne(API_URL + '/admin');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('get', () => {
    it('should return an Observable<User>', () => {
      const mockUser: User = { id: 1, username: 'John', email: 'john@example.com', accessRights: [] };
      service.get(1).subscribe(user => {
        expect(user).toEqual(mockUser);
      });
      const req = httpMock.expectOne(`${API_URL}/user/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });
});
