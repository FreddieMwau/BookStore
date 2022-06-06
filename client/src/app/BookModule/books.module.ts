import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookHomeComponent } from './book-home/book-home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './Service/jwt-interceptor.service';
import { FormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { EditBookComponent } from './edit-book/edit-book.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AllBooksComponent,
    AddBookComponent,
    BookHomeComponent,
    BookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'', component:DashboardComponent, children:[
          {path:'', component: BookHomeComponent},
          {path: 'allBooks', component: AllBooksComponent},
          {path: 'addBook', component: AddBookComponent},
          { path: 'book/:bookId', component: BookComponent},
          {path: 'edit/:bookId', component: EditBookComponent}
        ]
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class BooksModule { }
