import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationDetails ={
    userName:'',
    userEmail:'',
    userPassword:''
  }
  msg:string=''

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.registerUser(this.registrationDetails).subscribe(
      (res) => {
        this.msg = res.message
        localStorage.setItem('token', res.token)
        if (res.message == "User created successfully"){
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 3500)
        } else {
          this.msg = res.message
        }
      },
      (error) => {
        console.log(error.error.message);
        
      }
    )
   }
}
