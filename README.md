# Full Stack Developer Challenge

original repo: https://github.com/Pay-Baymax/FullStackEngineerChallenge

## Usage

### DB
1. Make sure you have docker installed
2. run from backend root: `./scripts/runDb.sh`

This will start MySQL in a docker container listening on: `tcp://localhost:3306`

### Backend
In backend root
1. `npm install`
2. `npm start`

This will start backend listening on: `http://localhost:5000`

### Frontend
In frontend root
1. `npm install`
2. `npm start`

This will start the frontend with dev server on: `http://localhost:3000`

## Features

Admin view
* employees
  * Add ✅
  * remove ✅
  * update ✅
  * view ✅

* performance reviews
  * Add ✅
  * update ❌
  * view ✅

Assign employees to participate in another employee's performance review ✅

Employee view ❌
* List of performance reviews requiring feedback ❌

Implementation plan for Employee View would be a separate API to make sure that no authorization issues are present. Also with a different DB user to make it even more restrictive than the admin user. I would advocate for separate api since the admin api could potentially just be deployed in a more secure environment with even more restrictive access. But, the employee View would need to be open to a larger audience to make it convienent for employees to submit their feedback.

If the architectural choice was made to just have 1 API. It would be very important to make sure that the admin functions are only reachable by the authoritized users. And that only the admin features are using the admin DB user.

## High level description of design and technologies

### Frontend
SPA using React with Typescript. Starting template: create-react-app

I added Redux for state management and to do all requests in the middleware layer. I didn't use any middleware library like redux-saga, or thunk, since it's a simple application where a custom middleware is sufficient.

Typescript is very convenient for making sure the correct types are used. I didn't type the expected response which makes it easier to work with data from APIs.

### Backend
Node.js with express for the main routing

To be honest, I was using my api from this project: https://github.com/MrOggy85/learning-japanese-admin-api as a template and I had to remove some code and added the parts for this assignment. I was using MongoDB before so I couldn't use `mongoose` for MySQL. It's not an elegant solution that I am submitting...

The backend includes the startup scripts for creating tables.

### DB
MySQL 5.7.30 using Docker.

I was using 5.7.30 instead of the latest 8.0.20 because I ran into an authentication issues with the `mysql` client library. The problem was that the newest version of MySQL has a newer authentication standard. I decided to use a previous version instead of spending time on researching and implementing the correct authentication.

## Missing Features and Security Risks ❌

### No Authentication
The Backend is not implementing any authentication. A proper solution would use `passport` to implement an authentication layer for each route in the app. It should also check the user credentials against the DB. This would also require some kind of admin screen to manage users, for convenience. Otherwise they have to be managed directly through the DB.

### DB user is superuser
The DB is currently just initialized with the root user, which is used by the application. This is a major security risk. There should be a specific user made for this app which just have the ability to read/change data in the

### No ORM
The code would become more stable and secure if I used an ORM instead of just raw queries.

### SQL Injection Risk
There is currently a risk for SQL injection since the input is not sanitized.

### No i18n
All of the text is hardcoded and are not handled by a i18n library. Normally all text should be stored in a json (or other standard format of choice) file to be easily translated and handled by a i18n library.

### No Test
I didn't right any unit tests for the frontend ot the backend. I was not practicing TDD, I was just doing a fast prototype. There is also no integrations tests for testing that the DB queries ar eworking as expected and that the API is performing as expected. And finally no automated end2end tests for making sure that the frontend is working as expected.

### No DB Migration
Currently the backend are just doing a basic check if the table exists. If not it is created. A more sophisticated migration framework is needed to be able to assure that the DB is using the latest expected structure and that no data loss happens when migrating to a different structure.

### DB Fail Risk
When executing queries, especially directly after startup, it doesn’t check first that the connection has been started

### Connection Never Closed
Not closing the connection to the DB after finished.

### DB Credentials in Backend
DB credentials are defined in code in cleartext. They should be given as environment variables.

### No SSL
I would normally implement TLS/SSL support in the ngnix layer and keep the underlying services using unencrypted communication. Depending on how the backend is deployed and how the DB is deployed we may need to ensure that this communication is encrypted too.

## Minor Bugs
* When browser refreshing in details page some fields doesn’t get filled in
    * Reason, useState is initialized with ‘’ and then doesn’t gets updated correctly
        * Solution: don’t use state, use uncontrolled input and read from it when submitting instead

### More Issues
There are even more issues. I haven't went through the whole OWASP list for this application so there are other potential issues to mitigate.
