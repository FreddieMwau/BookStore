CREATE OR ALTER PROCEDURE createUser(@userId VARCHAR(50), @userName VARCHAR(100), @userEmail VARCHAR(150), @userPassword VARCHAR(300))
AS BEGIN
INSERT INTO Users(userId, userName, userEmail, userPassword)
VALUES(@userId, @userName, @userEmail, @userPassword)
END