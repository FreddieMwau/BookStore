CREATE OR ALTER PROCEDURE updateBook(@bookId VARCHAR(50), @bookImageUrl VARCHAR(300), @bookTitle VARCHAR(100), @bookAuthor VARCHAR(50), @bookDescription VARCHAR(150), @publishedDate int)
AS BEGIN
UPDATE Books SET bookTitle = @bookTitle, bookImageUrl = @bookImageUrl, bookAuthor = @bookAuthor, bookDescription = @bookDescription, publishedDate = @publishedDate WHERE bookId = @bookId
END