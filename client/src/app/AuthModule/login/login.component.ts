import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInDetails = {
    userEmail:'',
    userPassword:''
  }
  msg:string=''

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }


  options: AnimationOptions = {
    path: '/assets/lottie/books.json'
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  logInUser(){
    this.authService.logInUser(this.logInDetails).subscribe(
      (res) => {
        this.msg = res.message
        localStorage.setItem('token', res.token)
        if (res.message == "Logged in successfully"){
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 3500)
        } else{
          this.msg = res.message
        }
      },
      (error) => {
        console.log(error.error);
      }
    )    
  }
}
