import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookHomeComponent } from './book-home/book-home.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AllBooksComponent,
    AddBookComponent,
    BookHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'', component:DashboardComponent, children:[
          {path:'', component: BookHomeComponent},
          {path: 'allBooks', component: AllBooksComponent},
          {path: 'addBook', component: AddBookComponent}
        ]
      }
    ])
  ]
})
export class BooksModule { }
