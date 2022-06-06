import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './AuthModule/authentication.module';
import { BooksModule } from './BookModule/books.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AuthenticationModule,
    BooksModule,
    HttpClientModule,
    FormsModule,
    [LottieModule.forRoot({ player: playerFactory })]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
