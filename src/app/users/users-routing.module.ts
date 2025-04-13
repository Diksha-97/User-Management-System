import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },       // List users (details page)
  { path: 'add', component: UserFormComponent },     // Add new user(form page)
  { path: 'edit/:id', component: UserFormComponent } // Edit user by ID(form page)

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
