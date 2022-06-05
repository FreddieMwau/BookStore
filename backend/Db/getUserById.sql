CREATE OR ALTER PROCEDURE getUserById(@userId VARCHAR(50))
AS BEGIN
SELECT userId, userName, userEmail FROM Users WHERE userId = @userId
END