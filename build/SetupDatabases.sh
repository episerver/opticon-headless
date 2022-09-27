#!/bin/bash

export cms_db=opticon.headless.cms
export user=cmsUser
export password=epi#Server7Local

export sql="/opt/mssql-tools/bin/sqlcmd -S . -U sa -P ${SA_PASSWORD}"

echo @Wait MSSQL server to start
export STATUS=1
i=0

while [[ $STATUS -ne 0 ]] && [[ $i -lt 60 ]]; do
    sleep 5s
	i=$i+1
	$sql -Q "select 1" >> /dev/null
	STATUS=$?
    echo "***Starting MSSQL server..."
done

if [ $STATUS -ne 0 ]; then 
	echo "Error: MSSQL SERVER took more than 3 minute to start up."
	exit 1
fi


echo @Creating database if not exists...
$sql -Q "IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'opticon.headless.cms') BEGIN CREATE DATABASE [opticon.headless.cms] END"

echo @Creating user if not exists...
$sql -Q "IF NOT EXISTS (SELECT name FROM sys.sql_logins WHERE name='cmsUser') BEGIN CREATE LOGIN cmsUser WITH PASSWORD='epi#Server7Local', DEFAULT_DATABASE=[opticon.headless.cms]; END"

echo @Creating user...
$sql -d opticon.headless.cms -Q "EXEC sp_adduser @loginame='cmsUser'"
$sql -d opticon.headless.cms -Q "EXEC sp_addrolemember N'db_owner', N'cmsUser'"

echo @Done creating databases.