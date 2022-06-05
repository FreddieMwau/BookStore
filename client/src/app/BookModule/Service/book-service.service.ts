import { Injectable } from '@angular/core';
import { BooksModel } from '../interfaces/books';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private books: BooksModel[] =[
    {
      bookImage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.68eC6HzJ_tG-T5XnKl_fAQHaEJ%26pid%3DApi&f=1',
      bookTitle:'The Hunger Games',
      bookAuthor:'Suzanne Collins',
      publishedDate:2002
    },
    {
      bookImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.vbNkO7hv62XqPNnKFBpfewHaLK%26pid%3DApi&f=1',
      bookTitle: 'To Kill a Mockingbird',
      bookAuthor: 'Harper Lee',
      publishedDate: 2002
    },
    {
      bookImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.fN0x6dKFYlP3FY2Ya5NQdAHaKN%26pid%3DApi&f=1',
      bookTitle: 'The Book Thief',
      bookAuthor: 'Markus Zusak',
      publishedDate: 2002
    },
    {
      bookImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.bJxN4NBsWnv0_OK-VZ6RIwHaJl%26pid%3DApi&f=1',
      bookTitle: 'The Da Vinci Code',
      bookAuthor: 'Dan Brown',
      publishedDate: 2002
    },
    {
      bookImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LMmt1qS788nX3wHjxA8BCQHaKe%26pid%3DApi&f=1',
      bookTitle: 'Memoirs of a Geisha',
      bookAuthor: 'Arthur Golden',
      publishedDate: 2002
    },
    {
      bookImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.7Uun5tHj6fKkNV3aX3dv5gAAAA%26pid%3DApi&f=1',
      bookTitle: 'The Odyssey',
      bookAuthor: 'Homer',
      publishedDate: 2002
    }
  ]
  constructor() { }

  getAllBooks(){
    return this.books;
  }

  addBook(book:BooksModel){
    this.books.push(book)
  }

  // deleteBook(){}
}
