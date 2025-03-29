import { Injectable, signal, computed } from '@angular/core';
import { SHA256 } from 'crypto-js';

interface User {
  username: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users';
  private activeUserKey = 'activeUser';
  private activeUser = signal<string | null>(sessionStorage.getItem(this.activeUserKey));
  isLoggedIn = computed(() => !!this.activeUser());

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some((user) => user.username === username)) {
      return false;
    }
    const passwordHash = SHA256(password).toString(); // using CryptoJS to hash the password
    users.push({ username, passwordHash });
    this.saveUsers(users);
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const passwordHash = SHA256(password).toString(); // using CryptoJS to hash and compare the password
    const user = users.find(
      (user) => user.username === username && user.passwordHash === passwordHash
    );
    if (user) {
      // storing the username in session storage to drop it when the session ends(window closed)
      sessionStorage.setItem(this.activeUserKey, username);
      this.activeUser.set(username);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.activeUserKey);
    this.activeUser.set(null);
  }

  getActiveUser(): string | null {
    return this.activeUser();
  }
}
