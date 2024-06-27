#!/bin/bash

# Wait for SQL Server to start
sleep 30s

# Run the initialization SQL script
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -d master -i /usr/src/app/init.sql
/


# #!/bin/bash

# # Read environment variables
# SA_PASSWORD=${SA_PASSWORD}
# DB_NAME=${DB_NAME}
# DB_USER=${DB_USER}
# DB_USER_PASSWORD=${DB_USER_PASSWORD}

# # Create database
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -Q "CREATE DATABASE ${DB_NAME}"

# # Create table in the new database
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -d ${DB_NAME} -Q "CREATE TABLE TestTable (ID INT PRIMARY KEY, Name NVARCHAR(50))"

# # Create login and user
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -Q "CREATE LOGIN ${DB_USER} WITH PASSWORD = '${DB_USER_PASSWORD}'"
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -d ${DB_NAME} -Q "CREATE USER ${DB_USER} FOR LOGIN ${DB_USER}"
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -d ${DB_NAME} -Q "ALTER ROLE db_owner ADD MEMBER ${DB_USER}"







# !/bin/bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "CREATE DATABASE TestDB"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -d TestDB -Q "CREATE TABLE TestTable (ID INT PRIMARY KEY, Name NVARCHAR(50))"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "CREATE LOGIN testuser WITH PASSWORD = 'TestPassword!1'"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -d TestDB -Q "CREATE USER testuser FOR LOGIN testuser"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -d TestDB -Q "ALTER ROLE db_owner ADD MEMBER testuser"
