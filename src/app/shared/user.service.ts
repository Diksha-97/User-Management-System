import { Injectable } from '@angular/core';
import { User } from '../users/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    user.id = new Date().getTime();
    users.push(user);
    this.saveUsers(users);
  }
  updateUser(updated: User): void {
    const users = this.getUsers().map(user => user.id === updated.id ? updated : user);
    this.saveUsers(users);
  }

  deleteUser(id: number): void {
    const users = this.getUsers().filter(user => user.id !== id);
    this.saveUsers(users);
  }

  getUserById(id: number): User | undefined {
    return this.getUsers().find(user => user.id === id);
  }

}
