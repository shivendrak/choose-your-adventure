![Adventure Game Client](https://github.com/ShivendraKu/choose-your-adventure/workflows/Adventure%20Game%20Client/badge.svg)
![Adventure Game API](https://github.com/ShivendraKu/choose-your-adventure/workflows/Adventure%20Game%20API/badge.svg)

# Demo URL
[Angular App](https://shivendra-cyo.azurewebsites.net/)

[API Swagger](https://shivendra-cyo-api.azurewebsites.net/swagger)

> This repository is configured in MonoRepo fashion.

> adventure-game-client : contains the angular client code. 

> adventure-game-api : contains the .net core api app. 


# Adventure Game Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Run application

### Open cmd and execute following command to install dependencies. 
`cd adventure-game-client`

`npm install`

The application is configured with 2 options to run with. 
### 1. Without api
With this option the UI will run standalone and the data will be served from assets folder in the source code.

To run with this options hit following command. The app will be automatically launched.

`npm start`

If you wish to run the app on a different port use following

`ng serve --port <your port number> --open`

### 2. With API
With this option the UI will run standalone and the data will be served from assets folder in the source code.

To run with this options hit following command. The app will be automatically launched.

`ng serve -c with-api --port 55500 --open`

If you wish to run the app on a different port use following
`ng serve -c with-api --port <your port number> --open`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Known Issues
1. Decision tree display dropping lines from leaf nodes. 
2. Router takes to empty page sometimes. 


# Adventure Game API

This project was created in .net Core 3.1

## Run application

Open the server/<<>>.sln file in VS 2019 and hit f5 to start the api server. 
