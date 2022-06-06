import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BooksModel } from '../BookModule/interfaces/books';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  options: AnimationOptions = {
    path: '/assets/lottie/books.json'
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

}
