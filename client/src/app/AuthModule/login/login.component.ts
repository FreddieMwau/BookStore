import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  options: AnimationOptions = {
    path: '/assets/lottie/books.json'
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  register(){
    setTimeout(()=>{
      this.router.navigate(['/dashboard'])
    }, 2500)
  }
}
