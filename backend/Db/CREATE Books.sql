CREATE TABLE Books
(
    bookId VARCHAR(50) not NULL,
    bookImageUrl VARCHAR(300) NOT NULL,
    bookTitle VARCHAR(100) NOT NULL,
    bookAuthor VARCHAR(50) NOT NULL,
    bookDescription VARCHAR(150) NOT NULL,
    publishedDate int,
    PRIMARY KEY(bookId)
)