import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve a token', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(service.getToken()).toEqual(token);
  });

  it('should save and retrieve a user', () => {
    const user = { id: 1, name: 'John Doe' };
    service.saveUser(user);
    expect(service.getUser()).toEqual(user);
  });

  it('should clear the session storage', () => {
    spyOn(window.sessionStorage, 'clear');
    service.signOut();
    expect(window.sessionStorage.clear).toHaveBeenCalled();
  });
});
