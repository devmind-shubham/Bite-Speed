# Use the official Microsoft SQL Server image (latest version)
FROM mcr.microsoft.com/mssql/server

# Set environment variables for SQL Server
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Shubham@12345
ENV NEWUSER=devil
ENV NEWUSER_PASSWORD=devil@12345

# Expose the SQL Server port
EXPOSE 1433

# Copy the initialization script to the container
COPY init.sql /usr/src/app/init.sql

# Run the initialization script
CMD /bin/bash -c "/opt/mssql/bin/sqlservr & sleep 30s && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /usr/src/app/init.sql && wait"





# # Use the official Ubuntu base image
# FROM ubuntu:20.04

# # Set environment variables for non-interactive installation
# ENV DEBIAN_FRONTEND=noninteractive

# # Install required packages and SQL Server
# RUN apt-get update && \
#     apt-get install -y wget curl gnupg2 software-properties-common && \
#     curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
#     add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2019.list)" && \
#     apt-get update && \
#     apt-get install -y mssql-server && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# # Set environment variables for SQL Server
# ENV ACCEPT_EULA=Y
# ENV SA_PASSWORD=Shubham@69
# ENV MSSQL_PID=Developer

# # Expose the SQL Server port
# EXPOSE 1433

# # Run SQL Server process
# CMD ["/opt/mssql/bin/sqlservr"]




















# FROM node

# # Set the working directory
# WORKDIR ./bite-speed

# # Copy package.json and package-lock.json files to the working directory
# COPY package*.json .

# Copy . .

# # Install dependencies
# RUN npm install

# # Expose the port the app runs on
# EXPOSE 9000











