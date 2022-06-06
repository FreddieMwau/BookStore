import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksModel } from '../interfaces/books';
import { BookService } from '../Service/book-service.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  books: BooksModel[] = []
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data
    })
  }

  viewBook(bookId?: string) {
    if (bookId) {
      this.bookService.getBookById(bookId)
      this.router.navigate([`book/${bookId}`])
    }
  }

}
