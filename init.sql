-- Create a new login
CREATE LOGIN [$NEWUSER] WITH PASSWORD = [$NEWUSER_PASSWORD];
GO

-- Create the bitespeed database
CREATE DATABASE bitespeed;
GO

-- Switch to the bitespeed database context
USE bitespeed;
GO

-- Create a new user in the bitespeed database for the new login
CREATE USER [$NEWUSER] FOR LOGIN [$NEWUSER];
GO

-- Grant read, write, and update permissions to the new user on the bitespeed database
ALTER ROLE db_datareader ADD MEMBER [$NEWUSER];
ALTER ROLE db_datawriter ADD MEMBER [$NEWUSER];
GRANT UPDATE TO [$NEWUSER];
GO

-- Create the contacts table
CREATE TABLE contacts (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(15),
    created_at DATETIME DEFAULT GETDATE()
);
GO
