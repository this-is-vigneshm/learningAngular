import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PracticeService } from './service/practice.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'learningAngular';
  learn: boolean = true

  constructor() { }

  ngOnInit(): void {
    this.learn = localStorage.getItem('work') === 'true';
  }



  changeWorkspace() {
    this.learn = !this.learn
    localStorage.setItem('work', String(this.learn));
  }

  // a = [1, 2, 3, 4, 5];

  // add(value: NgForm) {
  //   const vl = value.value.value;
  //   this.a = [...this.a, vl]
  //   value.resetForm({ value: 2 });
  // }

  // update() {
  //   this.a = this.a.map((b: any) => {
  //     if (b === 2) {
  //       return 5;
  //     }
  //     return b;
  //   })
  // }
}
