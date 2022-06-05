import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path:'auth', loadChildren: ()=> import('./AuthModule/authentication.module').then(registration => registration.AuthenticationModule)},
  { path: 'dashboard', loadChildren: () =>import('./BookModule/books.module').then(dashboard => dashboard.BooksModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
