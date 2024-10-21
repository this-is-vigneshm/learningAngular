import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  {
    path: 'users/new',
    component: UserSingleComponent,
    data: { isEdit: false },
  },
  { path: 'users/:id', component: UserSingleComponent, data: { isEdit: true } },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
];

@NgModule({
  declarations: [UserSingleComponent, UserCreateComponent, UserListComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
})
export class UserModule {}
