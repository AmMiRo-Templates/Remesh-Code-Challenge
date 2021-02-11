# Remesh Jr

## Getting Set Up

1. Clone this repository to your local machine.
2. cd into the Remesh-Code-Challenge folder.
3. Run `npm i` in the terminal to download dependencies for server and database.
4. Run `npm start` to start the server.
5. The server will be running on http://localhost:5000.
6. cd into client folder (in a separate terminal).
7. Run `npm i` to download client dependencies.
8. In order overcome dependency issues when setting up testing you will need to create a .env file in the client folder and add `SKIP_PREFLIGHT_CHECK=true` to that file (without this, the react app will not start).
9. Run `npm start` to start the react app.
10. The react app will be running on http://localhost:3000.

## Navigating the app

1. You will begin at the "sign in" page. Since there was no user authentication required for this assessment, all that is required is to click on an available username or enter one you would prefer to use.
2. Once "signed in" a list of conversations is available along with a form to either search for a specific conversation, or add a new conversation. The "show more" button will open the conversation to reveal the messages for that conversation, as well as a form to add additional messages.
3. Each message will have a "show more" button that will show the available thoughts for that message and a form to create additional thoughts for that conversation.

## Notes on Testing

1. To run tests, cd into Remesh-Code-Challenge folder, and run `npm test`.
2. Tests are located in the **tests** folder.
3. Tests written for the back end of the application should run and pass.
4. Tests were written for the front end of the application, however, getting the front end test environment working was not achieved in the time allowed. Tests written for the front end can be viewed and are commented out in the storeActions.test.js file.
