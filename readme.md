

# VRIFY - API

node.js API to manage customers and their address

# Environment setup
## Start the database
> docker-compose up -d
## Install dependencies
>npm i
## Execute migrations
>npx sequelize db:migrate
## Execute seeds
>npx sequelize db:seed:all

# How to run
## To run in development mode
### To start the database
> docker-compose up -d

### To start the application
> **npm start**

## To run the tests
### To start the database
> docker-compose up -d

### To start the application
> **npm test**
