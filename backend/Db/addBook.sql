CREATE OR ALTER PROCEDURE addBook(@bookId VARCHAR(50), @bookTitle VARCHAR(100), @bookAuthor VARCHAR(50), @bookDescription VARCHAR(150), @publishedDate INT)
AS BEGIN
INSERT INTO Books(bookId, bookTitle, bookAuthor, bookDescription, publishedDate)
VALUES(@bookId, @bookTitle, @bookAuthor, @bookDescription, @publishedDate)
END