import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient, private router:Router) { }

  logInUser(user: Users){
    return this.httpClient.post<any>("http://localhost:7000/user/login", user);
  }

  registerUser(user: Users) {
    return this.httpClient.post<any>("http://localhost:7000/user/create", user);
  }

  isLoggedIn(){
    // check if the token is stored in local storage
    //  the !! returns true/false if token is present
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}
