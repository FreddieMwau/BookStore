CREATE OR ALTER PROCEDURE deleteBook(@bookId VARCHAR(50))
AS BEGIN
DELETE FROM Books WHERE bookId = @bookId
END