import { Injectable } from '@angular/core';
import { BooksModel } from '../interfaces/books';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: BooksModel[] =[]
  constructor(private http:HttpClient) { }

  addBook(book: BooksModel) {
    return this.http.post<any>("http://localhost:7000/books/create", book);
  }

  getBooks() {
    return this.http.get<BooksModel[]>("http://localhost:7000/books/");
  }

  getBookById(bookId: string){
    return this.http.get<BooksModel>(`http://localhost:7000/books/book/${bookId}`)
  }

  deleteBook(bookId: string){
    return this.http.delete<any>(`http://localhost:7000/books/delete/${bookId}`);
  }

  updateBook(bookId: string, book:BooksModel){
    return this.http.put<any>(`http://localhost:7000/books/update/${bookId}`, book);
  }
}
