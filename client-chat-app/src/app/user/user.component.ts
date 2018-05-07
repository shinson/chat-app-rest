import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, 
              private cookieService:CookieService,
              private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  add(username: string): void {
    username = username.trim();

    if (!username) { return; }

    this.userService.addUser({ username } as User)
      .subscribe(user => {
        this.users.push(user);
        this.cookieService.set( 'User', String(user.id));

        this.router.navigate(['/chat']);
      });
  }

}
