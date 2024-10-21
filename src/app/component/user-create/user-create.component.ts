import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { PracticeService } from '../../service/practice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

  @Input() userId!: string;
  @Output() create = new EventEmitter<User>
  @Output() update = new EventEmitter<User>
  @Output() delete = new EventEmitter<User>


  user!: User
  isEdit!: Boolean;

  constructor(private practiceService: PracticeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.practiceService
      .readOne(id)
      .subscribe((user) => {
        this.user = user;
      }
      );
    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.user.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }
  handleDelete(form: NgForm) {
    if (confirm(`Really want to delete ${this.user.name}?`)) {
      this.delete.emit({ ...this.user });
    }
  }
}
