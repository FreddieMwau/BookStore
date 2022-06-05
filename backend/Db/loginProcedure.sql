CREATE OR ALTER PROCEDURE logInUser(@userEmail VARCHAR(150), @userPassword VARCHAR(300))
AS BEGIN
SELECT userName, userEmail, userPassword FROM Users
WHERE userEmail = @userEmail AND userPassword = @userPassword
END