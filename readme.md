

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


# How to use
## To List all customers
### GET http://localhost:3003/customer
> curl --request GET \\
  --url http://localhost:3003/customer

## To get one customer by id
### GET http://localhost:3003/customer/1
> curl --request GET \\
  --url http://localhost:3003/customer/1

## To create a new customer
### POST http://localhost:3003/customer
>curl --request POST  --url http://localhost:3003/customer --header 'content-type: application/json' --data '{
	"name": "Ricardo G"
}'

## To update one customer
### PUT http://localhost:3003/customer/1
> curl --request PUT --url http://localhost:3003/customer/1 --header 'content-type: application/json' --data '{
	"name": "Ricardo Georgel"
}'

## To delete one customer
### DELETE http://localhost:3003/customer/1
> curl --request DELETE --url http://localhost:3003/customer/1


## To List all address of one customer
### GET http://localhost:3003/customer/1/address
> curl --request GET --url http://localhost:3003/customer/1/address

## To get one address of one customer by id
### GET http://localhost:3003/customer/1/address/1
> curl --request GET --url http://localhost:3003/customer/1/address/1

## To create a address
### POST http://localhost:3003/customer/1/address
>curl --request POST --url http://localhost:3003/customer/1/address --header 'content-type: application/json' --data '{
	"streetAddress": "223 street",
	"postalCode": "12345",
	"country": "US"
}'

## To update one address
### PUT http://localhost:3003/customer/1/address/1
> curl --request PUT --url http://localhost:3003/customer/1/address/1 --header 'content-type: application/json' --data '{
	"streetAddress": "102 street 2",
	"postalCode": "9876",
	"country": "BR"
}'

## To delete one address
### DELETE http://localhost:3003/customer/1/address/1
> curl --request DELETE --url http://localhost:3003/customer/1/address/1