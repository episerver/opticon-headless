

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'opticon.headless.cms')
	BEGIN
		CREATE DATABASE [opticon.headless.cms]
	END
GO

IF NOT EXISTS (SELECT name FROM sys.sql_logins WHERE name='cmsUser')
    BEGIN
        CREATE LOGIN cmsUser WITH PASSWORD='epi#Server7Local', DEFAULT_DATABASE=[opticon.headless.cms];
		USE [opticon.headless.cms];
		EXEC sp_adduser @loginame='cmsUser';
		EXEC sp_addrolemember N'db_owner', N'cmsUser';
    END
GO
      