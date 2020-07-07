import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setUserName', () => {
    it('should set the logged in username', () => {
      const testUserName = 'testUserName';
      let setUserName = '';
      service.getUserName().subscribe(userName => setUserName = userName);
      service.setUserName(testUserName);
      expect(setUserName).toEqual(testUserName);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should throw error when null, empty or undefined name is provided', () => {
      let setUserName = '';
      service.getUserName().subscribe(userName => setUserName = userName);
      expect(() => service.setUserName('')).toThrowError();
      expect(() => service.setUserName(null)).toThrowError();
      expect(() => service.setUserName(undefined)).toThrowError();
      expect(setUserName).toEqual('');
    });
  });

  describe('getUserName', () => {
    it('should return observable of username', () => {
      const testUserName = 'testUserName';
      let setUserName = '';
      service.getUserName().subscribe(userName => setUserName = userName);
      expect(setUserName).toEqual('');
      service.setUserName(testUserName);
      expect(setUserName).toEqual(testUserName);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when login success', () => {
      const testUserName = 'testUserName';
      service.setUserName(testUserName);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false when user is not logged in', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
