import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  userName: string;
  isError: boolean;
  constructor(public router: Router, public userService: UserService) { }

  onLogin(): void {
    if (!this.userName) {
      this.isError = true;
      return;
    }
    this.userService.setUserName(this.userName);
    this.router.navigate(['/dashboard']);
  }

}

