import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../Service/book-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookDetails ={
    bookImageUrl:'',
    bookTitle:'',
    bookAuthor:'',
    bookDescription:'',
    publishedDate:0
  }
  msg:string =''

  constructor(private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
  }

  saveBook(){
    this.bookService.addBook(this.addBookDetails).subscribe(
      (res) =>{
        this.msg = res.message
        if (res.message == "Book saved successfully"){
          setTimeout(() => {
            this.router.navigate(['/allBooks'])
          }, 3500);
        } else {
          this.msg = res.message
        }
      },
      (error) =>{
        console.log(error.error);
      }
    )
  }

}
