// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

interface User {
  username: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersKey = 'users';
  private activeUserKey = 'activeUser';

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some(user => user.username === username)) {
      return false; // Username already exists
    }
    const passwordHash = CryptoJS.SHA256(password).toString();
    users.push({ username, passwordHash });
    this.saveUsers(users);
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const passwordHash = CryptoJS.SHA256(password).toString();
    const user = users.find(user => user.username === username && user.passwordHash === passwordHash);
    if (user) {
      localStorage.setItem(this.activeUserKey, username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.activeUserKey);
  }

  getActiveUser(): string | null {
    return localStorage.getItem(this.activeUserKey);
  }

  isLoggedIn(): boolean {
    return !!this.getActiveUser();
  }
}
