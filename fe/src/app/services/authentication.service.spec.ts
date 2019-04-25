import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService, TokenPayload, UserDetails } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  const mockTokenContents: UserDetails = {
    _id: 'userId',
    email: 'test@test.ca',
    name: 'Test Name',
    exp: Date.now() / 1000 + 60,
    iat: 1
  };
  const mockToken = `XXXXXXXXXXXXX.${btoa(JSON.stringify(mockTokenContents))}.XXXXXXXXXXX`;

  const mockExpiredTokenContents: UserDetails = {
    _id: 'userId',
    email: 'test@test.ca',
    name: 'Test Name',
    exp: Date.now() / 1000 - 60,
    iat: 1
  };
  const mockExpiredToken = `XXXXXXXXXXXXX.${btoa(JSON.stringify(mockExpiredTokenContents))}.XXXXXXXXXXX`;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthenticationService]
    });

    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should not be logged in by default', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  describe('login with valid token response', () => {
    beforeEach(() => {
      const payload: TokenPayload = { email: 'test@test.ca', password: 'pa55w0rd' };

      service.login(payload).subscribe((data: any) => {
        expect(data.token).toBe(mockToken);
      });

      // expect call to proper url for login
      const req = httpMock.expectOne('http://localhost:5000/api/login', 'call to login');
      expect(req.request.method).toBe('POST');

      // return mock data from mock http request
      req.flush({
        token: mockToken
      });
    });

    afterEach(() => {
      // make sure there are no outstanding http calls
      httpMock.verify();
    });

    it('should login', () => {
      // expect user to be logged in
      expect(service.isLoggedIn()).toBeTruthy();
    });

    it('should set the proper token', () => {
      // expect token to be properly set
      expect(service.getToken()).toBe(mockToken);
    });

    it('should have the user details in the token', () => {
      // expect proper user info from token
      expect(service.getUserDetails()).toEqual(mockTokenContents);
    });

    it('should logout a user', () => {
      service.logout();
      expect(service.isLoggedIn()).toBeFalsy();
    });

    it('should have no details for a logged out user', () => {
      service.logout();
      expect(service.getUserDetails()).toBe(null);
    });

    it('should make subsequent calls with auth header', () => {
      service.profile().subscribe();

      const req = httpMock.expectOne('http://localhost:5000/api/profile', 'call to profile');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

      // return mock data from mock http request
      req.flush({
        profile: 'test profile'
      });
    });
  });

  it('should not be logged in for an expired token', () => {
    const payload: TokenPayload = { email: 'test@test.ca', password: 'pa55w0rd' };

    expect(service.isLoggedIn()).toBeFalsy();

    service.login(payload).subscribe();

    // expect call to proper url for login
    const req = httpMock.expectOne('http://localhost:5000/api/login', 'call to login');
    expect(req.request.method).toBe('POST');

    // return mock data from mock http request
    // this token has expired
    req.flush({
      token: mockExpiredToken
    });

    // expect user to not be logged in
    expect(service.isLoggedIn()).toBe(false);

    // make sure there are no outstanding http calls
    httpMock.verify();
  });
});
