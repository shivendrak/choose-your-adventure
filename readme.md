![Adventure Game Client](https://github.com/ShivendraKu/choose-your-adventure/workflows/Adventure%20Game%20Client/badge.svg)
![Adventure Game API](https://github.com/ShivendraKu/choose-your-adventure/workflows/Adventure%20Game%20API/badge.svg)

```
This repository is configured in MonoRepo fashion.
adventure-game-client : contains the angular client code. 
adventure-game-api : contains the .net core api app. 
```
The frontend and backend are both hosted in a azure webapp for demo purpose. Below url can be used to access the environments. 
  1. [Angular App](https://shivendra-cyo.azurewebsites.net/) 
  2. [API Swagger](https://shivendra-cyo-api.azurewebsites.net/swagger)

# Adventure Game Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Run application

### Open cmd and execute following command to install dependencies. 
`cd adventure-game-client`

`npm install`

The application is configured with 2 options to run with. 
#### 1. Without API
With this option, the UI will run standalone and the data will be served from assets folder in the source code.

To run with the option hit following command. The app will be automatically launched.

`npm start`

If you wish to run the app on a different port use following

`ng serve --port <your port number> --open`

#### 2. With API (requires backend to be running locally)
To run with this configuration it requires the api project to be running. The api project is configured to run on a specific port and the respective port information is already configured in client application as well. 

To run with the option hit following command. The app will be automatically launched.

`npm start -- -c with-api`

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Adventure Game API

This project was created in .net Core 3.1.

To run this project using VS 2019, open the **adventure-game-api/AdventureGame.Service.sln** file. Once the project is loaded in visual studio, hit F5 to launch the swagger URL. 
