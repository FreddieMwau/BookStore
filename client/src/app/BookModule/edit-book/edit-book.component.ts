import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksModel } from '../interfaces/books';
import { BookService } from '../Service/book-service.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: BooksModel = {
    bookImageUrl: '',
    bookTitle: '',
    bookAuthor: '',
    publishedDate: 0
  }
  msg:string = ''
  constructor(private bookService: BookService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const bookId = params['bookId']
      this.bookService.getBookById(bookId).subscribe(data => {
        this.book = data
      })
    })
  }

  saveChanges(bookId?: string){
    if(bookId){
      this.bookService.updateBook(bookId, this.book).subscribe(
        (res) => {
          this.msg = res.msg
          if (res.message == 'Book details updates successfully. '){
            setTimeout(()=>{
              this.router.navigate(['/allBooks'])
            }, 3500)
          } else {
            this.msg = res.message
          }
        },
        (error) => {
          console.log(error.error);
          
        }
      )
    }
  }

}
