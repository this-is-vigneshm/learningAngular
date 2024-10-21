import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { PracticeService } from '../../service/practice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css'
})
export class UserSingleComponent implements OnInit {

  users!: User[];

  constructor(private practiceService: PracticeService, private router: Router) { }

  ngOnInit(): void {

  }

  createUser(userObj: User) {
    this.practiceService
      .createUser(userObj)
      .subscribe((res) => this.router.navigate(['admin', 'users', res.id]));
  }

  updateUser(userObj: User) {
    this.practiceService
      .updateUser(userObj)
      .subscribe({
        next: (res) => this.router.navigate(['admin']),
        error: (err) => console.log('Error', err)
      }
      );
  }

  deleteUser(userObj: User) {
    this.practiceService
      .deleteUser(userObj)
      .subscribe(() => this.router.navigate(['admin']));
  }
}
