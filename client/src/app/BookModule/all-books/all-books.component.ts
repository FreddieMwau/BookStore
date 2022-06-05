import { Component, OnInit } from '@angular/core';
import { BooksModel } from '../interfaces/books';
import { BookServiceService } from '../Service/book-service.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  books:BooksModel[] = []
  constructor(private bookService: BookServiceService) { }

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks()
  }

}
