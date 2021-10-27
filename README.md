# A DEMONSTRATION OF JSON WEB TOKENS
This repo contains 2 projects demonstrating how to secure an API using JWT (JSON Web Tokens).

### `1. jwt-api` 
This project contains a Node/Express API backed by a Mongo database.

### `2. jwt-client-react`
This project contains a React/Redux app that consumes the API

## API Configuration
Add a .env file to the root of the project containing the environment variables found in the *notes/required-enviroment-variables.txt* file. These values include the API port, the connection string for the Mongo database and the secrets for encrypting and decrypting the two JWTs used.

After the .env file is configured run the *database/build-test.data.js* script to populate the database with test users. This should create 5 users with the usernames 'user-0' to 'user-4'. Each of these users has the password '1234'. Each has one or more of the roles found in the *database/roles.js* file assigned.

Start the API using *npm run start:debug*

A collection of API requests using the Thunder Client VSCode extension can be found in the file *thunder-client-collection/thunder-collection_jwt-api.json*

## API Endpoints

- api/login > pass a username & password to receive your token & cookie
- api/logout > revokes the refresh token cookie
- api/refreshtokens > request both new authorisation & refresh tokens
- api/demo/error > waits 2 seconds and returns 500
- api/demo/token-based-security > returns a message if the request is authorised with a token (or 401)
- api/demo/role-based-security > returns a message if the request is authorised with a specific role (or 401)

## Client configuration
If the API port is changed from the preconfigured value of 4001 then the value in the file *src/reference/endpoints.js* should be updated to match.

Start the client using *npm start*. Open [http://localhost:3000](http://localhost:3000) to view it in a browser.

## Usage
When the app page is first opened there should be a grey bar at the top of the browser window with a username entry box, a password entry box and a login button. The rest of the page should be empty except for the text 'home page'

Log in using one of the preconfigured users and the header bar should change to display 'Logged in as ' and a log out button. The home page should now display the list of roles assigned to that user. If the user has the 'admin' role then four demo links should be available >

    1. token demo > calls a endpoint on the API secured using a JWT
    2. role demo > calls a endpoint on the API secured using a role assigned to the user
    3. error demo > calls a endpoint on the API which waits 2 seconds and then returns a 500 error 
    4. refresh demo > directly calles the API endpoint used to refresh the authorisation JWT using a refresh JWT passed as a cookie

When a log in is successful, two JWTs are returned. 

The first is returned in the response body and is stored in Redux. It has a short expiry time (15 minutes) and contains user information such as the username and assigned roles. It is passed in requests to the API as an authorization header.

The second is returned with the response as an httpOnly cookie (called myRefreshToken). It has a longer expiry time (14 days). This cookie is passed in requests to the *api/refreshtokens* endpoint, which is used to request a new authorisation token when that token has expired.

Each token contains a *version* property which corresponds to the *tokenVersion* property of the requesting user at the time the token was requested. To revoke a users tokens increment the value of the *tokenVersion* property. This will cause the next attempt to refresh tokens to fail and log the user out.

If the browser window is closed while a user is still logged in to the app, the refresh token cookie will remain. If the refresh token in the cookie has not expired by the time the app is next opened, a request will be made for a new authorisation token and the previous user will be logged back in.

