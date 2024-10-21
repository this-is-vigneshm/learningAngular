import { Component, OnInit } from '@angular/core';
import { PracticeService } from '../../service/practice.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users!: User[];

  constructor(private practiceService: PracticeService) { }

  ngOnInit(): void {
    this.practiceService
      .read()
      .subscribe((users: User[]) => { this.users = users });
  }
}
