# Adventure Game Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Run application

### Open cmd and execute following command to install dependencies. 
`adventure-game-client> npm install`

The application is configured with 2 options to run with. 
### Without api
With this option the UI will run standalone and the data will be served from assets folder in the source code.

To run with this options hit following command. The app will be automatically launched.

`adventure-game-client> npm start`

If you wish to run the app on a different port use following

`ng serve --port <your port number> --open`

### With API
With this option the UI will run standalone and the data will be served from assets folder in the source code.

To run with this options hit following command. The app will be automatically launched.

`adventure-game-client> ng serve -c with-api --port 55500 --open`

If you wish to run the app on a different port use following
`ng serve -c with-api --port <your port number> --open`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Known Issues
1. Decision tree display dropping lines from leaf nodes. 
2. Router takes to empty page sometimes. 
3. 


# Adventure Game API

This project was created in .net Core. 

## Run application

Open the server/<<>>.sln file in VS 2019 and hit f5 to start the api server. 