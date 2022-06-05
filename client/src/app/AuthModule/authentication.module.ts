import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';


export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'', children: [
          {path:'login', component: LoginComponent},
          {path: 'signup', component: RegistrationComponent}
        ]
      }
    ]),
    [LottieModule.forRoot({ player: playerFactory })]
  ]
})
export class AuthenticationModule { }
