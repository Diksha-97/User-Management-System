import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';
  //getting all users from local storage
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  //storing  users from local storage
  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  //adding new users to local storage
  addUser(user: User): void {
    const users = this.getUsers();
    user.id = new Date().getTime();
    users.push(user);
    this.saveUsers(users);
  }

  //updating existing user to local storage
  updateUser(updated: User): void {
    const users = this.getUsers().map((user) =>
      user.id === updated.id ? updated : user
    );
    this.saveUsers(users);
  }
  //deleting selected users from local storage
  deleteUser(id: number): void {
    const users = this.getUsers().filter((user) => user.id !== id);
    this.saveUsers(users);
  }
  //getting id of user from local storage
  getUserById(id: number): User | undefined {
    return this.getUsers().find((user) => user.id === id);
  }
}
