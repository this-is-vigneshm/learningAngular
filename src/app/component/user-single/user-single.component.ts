import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { PracticeService } from '../../service/practice.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css'
})
export class UserSingleComponent implements OnInit {

  users!: User[];

  constructor(private practiceService: PracticeService) { }

  ngOnInit(): void {

  }

  createUser(userObj: User) {
    this.practiceService
      .createUser(userObj)
      .subscribe(() => console.log('User created successfully..!'));
  }

  updateUser(userObj: User) {
    this.practiceService
      .updateUser(userObj)
      .subscribe({
        next: (res) => console.log('User updated successfully..!', res),
        error: (err) => console.log('Error', err)
      }
      );
  }

  deleteUser(userObj: User) {
    this.practiceService
      .deleteUser(userObj)
      .subscribe(() => console.log('User deleted successfully..!'));
  }
}
