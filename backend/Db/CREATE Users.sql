CREATE TABLE Users
(
    userId VARCHAR(50) not NULL,
    userName VARCHAR(100) NOT NULL,
    userEmail VARCHAR(150) NOT NULL,
    userPassword VARCHAR(300) NOT NULL,
    PRIMARY KEY(userId)
)