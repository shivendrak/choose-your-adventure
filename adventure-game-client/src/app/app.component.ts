import { Component, OnInit } from '@angular/core';
import { UserService } from './services/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userName: string;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserName().subscribe(userName => this.userName = userName);
  }
}
