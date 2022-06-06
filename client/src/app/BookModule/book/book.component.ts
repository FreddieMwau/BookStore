import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksModel } from '../interfaces/books';
import { BookService } from '../Service/book-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: BooksModel = {
    bookImageUrl: '',
    bookTitle: '',
    bookAuthor: '',
    publishedDate: 0
  }
  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const bookId = params['bookId']
      this.bookService.getBookById(bookId).subscribe(data => {
        this.book = data
      })
    })
  }

  editBook(bookId? :string){
    if(bookId){
      this.bookService.getBookById(bookId)
      this.router.navigate([`edit/${bookId}`])
    }
  }

  deleteBook(bookId?: string) {
    if (bookId) {
      this.bookService.deleteBook(bookId).subscribe();
      this.bookService.getBooks().subscribe(books => console.log(books))
      this.router.navigate(['/allBooks'])
    }
  }

}
