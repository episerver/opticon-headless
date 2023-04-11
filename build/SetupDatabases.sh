#!/bin/bash

export sql="/opt/mssql-tools/bin/sqlcmd -S . -U sa -P ${SA_PASSWORD}"

echo @Wait MSSQL server to start
sleep 60


echo @Creating database if not exists...
$sql -Q "IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'opticon.headless.cms') BEGIN CREATE DATABASE [opticon.headless.cms] END"

echo @Creating commerce database if not exists...
$sql -Q "IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'opticon.headless.commerce') BEGIN CREATE DATABASE [opticon.headless.commerce] END"

echo @Creating user if not exists...
$sql -Q "IF NOT EXISTS (SELECT name FROM sys.sql_logins WHERE name='cmsUser') BEGIN CREATE LOGIN cmsUser WITH PASSWORD='epi#Server7Local', DEFAULT_DATABASE=[opticon.headless.cms]; END"

echo @Creating user...
$sql -d opticon.headless.cms -Q "EXEC sp_adduser @loginame='cmsUser'"
$sql -d opticon.headless.cms -Q "EXEC sp_addrolemember N'db_owner', N'cmsUser'"
$sql -d opticon.headless.commerce -Q "EXEC sp_adduser @loginame='cmsUser'"
$sql -d opticon.headless.commerce -Q "EXEC sp_addrolemember N'db_owner', N'cmsUser'"
echo @Done creating databases.