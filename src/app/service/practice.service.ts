import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PracticeService {
  users: User[] = [];

  constructor(private http: HttpClient) { }

  read() {
    if (this.users.length) {
      return of(this.users);
    }
    return this.http.get<User[]>(`/api/user`)
      .pipe(
        tap((users) => {
          this.users = users;
        }),
        catchError(this.handleError)
      );
  }

  readOne(id: string | null) {
    return this.read()
      .pipe(
        map((users) => {
          const user = users.find((user: User) => user.id === id);
          if (user) {
            return user;
          }
          return { name: '', age: 0, mail: '' };
        })
      );
  }

  createUser(payLoad: User) {
    return this.http.post<User>(`api/user`, payLoad)
      .pipe(
        tap((user) => {
          this.users = [...this.users, user];
        }),
        catchError(this.handleError)
      );
  }

  updateUser(payLoad: User) {
    return this.http.put<User>(`api/user/${payLoad.id}`, payLoad)
      .pipe(
        tap((user) => {
          this.users = this.users.map((item: User) => {
            if (item.id === payLoad.id) {
              return user;
            }
            return item;
          });
        }),
        catchError(this.handleError)
      );
  }

  deleteUser(payLoad: User) {
    return this.http.delete<User>(`api/user/${payLoad.id}`)
      .pipe(
        tap(() => {
          this.users = this.users.filter((item: User) => item.id !== payLoad.id);
        }),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.warn('Client', err.message);
    } else {
      console.warn('Server', err.status);
    }
    console.warn(err);
    return throwError(() => new Error(err.message));
  }
}
