# E-Garantia
Backend app for egarantia application: This is just a skeleton containing basic folder structure and database connection related stuff.
Considering we actually needs to setup microservices, each microservice can fork this structure and start implementing.

## Prequisites:
Below software needs to be installed:
1. NodeJs
2. Npm
3. Git
4. Visual studio code(Optional / Any editor of your choice)
5. SQL Server / Docker (Optional: I need it to setup mssql server on mac) :https://sqlchoice.azurewebsites.net/en-us/sql-server/developer-get-started/node/mac/

## Folder structure

### config
Config folder contains the required configurationd for the project

### routes
Routes folder contain the routes/url mappings to particular CRUDS

### Services
Service contains the actual business logic

### Models
Models are actual table definitions in database

### Daos
Daos are database access operations, interaction with database happens via this layer

### Utils
Utils contains utility functions required for service layers like email server, loggers etc

### tests
Tests contain unit tests for modules

### scripts
Scripts contains any docker or automation related stuff

### views
Views contain server side html templates


## How to run the server:

1. Go to root folder(/sas-portal-backend).
2. Run "npm install"
3. To run server: "npm start"
4. You can test API using postman
    GET : localhost:3000/routes
    
