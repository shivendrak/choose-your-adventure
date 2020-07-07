import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userName = new BehaviorSubject<string>('');
  private isLoginSuccess = new BehaviorSubject<boolean>(false);

  // Note: This implementation does not support logout as of now.
  setUserName(userName: string): void {
    if (!userName) {
      throw new Error('invalid user');
    }

    this.userName.next(userName);
    this.isLoginSuccess.next(true);
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isLoginSuccess.value;
  }

}
