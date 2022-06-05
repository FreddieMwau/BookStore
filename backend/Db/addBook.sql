CREATE OR ALTER PROCEDURE addBook(@bookId VARCHAR(50), @bookImageUrl VARCHAR(300),@bookTitle VARCHAR(100), @bookAuthor VARCHAR(50), @bookDescription VARCHAR(150), @publishedDate INT)
AS BEGIN
INSERT INTO Books(bookId, bookImageUrl, bookTitle, bookAuthor, bookDescription, publishedDate)
VALUES(@bookId, @bookImageUrl, @bookTitle, @bookAuthor, @bookDescription, @publishedDate)
END