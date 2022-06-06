import { Injectable } from '@angular/core';
import { BooksModel } from '../interfaces/books';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: BooksModel[] =[]
  constructor(private http:HttpClient) { }


  getBooks() {
    return this.http.get<BooksModel[]>("http://localhost:7000/books/")
  }

  addBook(book:BooksModel){
    this.books.push(book)
  }

  // deleteBook(){}
}
