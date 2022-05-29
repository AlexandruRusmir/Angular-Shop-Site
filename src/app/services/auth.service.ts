import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private rs: RestService) {}

  users:  User[] = [
  ];

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getEmail(): string {
    return String(localStorage.getItem('email'));
  }
  getUsername(): string{
    return String(localStorage.getItem('username'));
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(email: string, username: string): Observable<any> {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);

    this.setToken('ok');
    return of({ username, email });
}
}