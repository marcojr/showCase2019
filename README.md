### This is very WIP, not ready !

So, not a good time to judge my code !
Nothing is ready, code not polished, 
code lint not set...

But the idea will be...

A dummy project for people with intentions
to hire my services evaluate my code.

Will be a full stack solution called Mantha Ray. It's just a part of the full Manta Ray Project with is much more extense. I will offer just the login/registration .

# What you will be capable to evaluate on me ?

- My skills as NodeJS Developer
- My skills as Angular Developer
- My skylls as React Native Developer
- My skylls as ReactJS Developer
- My skills as UI/UX Designer

# Main technologies includes

- graphQL
- Apollo
- Sequelize
- Oauth2
- Azure
- Microsoft SQL Server

# And you will be also capable to notice...

- Reusable code
- The way I document my code
- The way I struct my code
- The way I document a solution
- Creation of APIs
- Consuming of APIs
- A bit of Rest because it's not really "dead"
- Await/Async/Promises
- Redux, Redux-Thunk
- RxJx
- SASS
- Responsive layout
- Gulp
- Styling with JS
- Typescript
- Despite I'm very strong in database design, this solution can't
    demonstrate much. So, feel free to ask me for the full DB design of Manta Ray.

# Explaining the solutions

At the **nodejs_graphql_apollo_sequelize** you will find the backend solution.

At the **react_native_graphql_redux **you will find the mobile solution using React Native, Redux and use of GraphQL on the very simple way using fetch instead hooks (So soon a version without redux and using hooks)

# What is Missing

- **nodejs_graphql_apollo_sequelize** : Missing implementation of a query
checkIfExists (email, phone) 

- **react_native_graphql_redux** : Forgot password, lint and
polishment and review of the code. Also, I need to put more transitions at the login forms because I am not happy. Bug: Camera is not working. Also, it's 
necessary to test in different devices.

- **react_js_graphql_redux** : Not started

- **angular_graphql_rxjs_ngrx** : Not started

# Executing react_native_graphql_redux

Assuming that you have already React Native installed and this repo cloned, follow the steps bellow:

- perform a npm install into the react_native_graphql_redux
- Use react-native upgrade to generate ios and android files
- Go to ios folder and execute pod install (assuming you have cocoa pods installed)
- create file react_native_graphql_redux/src/config/servers.js and put the following code:

```javascript
export const graphqlServer = '(url containing the nodejs_graphql_apollo_sequelize)/graphql'
export const nodeAPI = '(url containing the nodejs_graphql_apollo_sequelize)/'
```

# Deploying nodejs_graphql_apollo_sequelize:

After clone the repo, go to /nodejs_graphql_apollo_sequelize and create the file nodejs_graphql_apollo_sequelize/src/secrets.js and populate with your own data:

```javascript
export const JWT_SECRET = "??????"
export const PROD_DB_USERNAME = "??????"
export const PROD_DB_PASSWORD = "??????"
export const PROD_DB_SERVER = "??????"
export const PROD_DB_NAME = "??????"
export const DEV_DB_USERNAME = "??????"
export const DEV_DB_PASSWORD = "??????3"
export const DEV_DB_SERVER = "??????"
export const DEV_DB_NAME = "??????"
export const NEXMO_KEY =  "??????"
export const NEXMO_SECRET = "??????"
export const BLOB_SECRET = "??????"
export const BLOB_ACCOUNT = "??????"
```

Then execute /nodejs_graphql_apollo_sequelize:



    npm install

This GraphQL Apollo Server uses Microsoft SQL Server. You will find the file to generate the tables inside the folder /database

Create the database, the user and the assignments necessary for access and execute the .sql file

Also, this GraphQL Apollo Server requires a BLOB account on Microsoft Azure to store the pictures from the users. Don't forget to setup this.

Oh, I almost forgot... you need to setup an account
at https://www.nexmo.com/ for SMS API. After this step, you need to populate your consumer key and secret at the secrets.js file.

Too much work, no ? Yeah, I know...let's make different...download the code to evaluate me, but instead lift the server, ask me for the url containing an Amazon AWS Elastic Beanstalk running all of this.Playground is available, so you can have good times executing queries and mutations.: I am good thanks!

# Few screen shots of mobile react native solution

Initial Screen         |  Login Screen
:-------------------------:|:-------------------------:
![![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr6.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr6.png)  |  [![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr5.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr5.png)

Signing Up         |  Confirm SMS
:-------------------------:|:-------------------------:
![![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr3.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr3.png)  |  ![][![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr4.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr4.png)

User Pic Selected          |  Select Source
:-------------------------:|:-------------------------:
![![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr1.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr1.png)  |  ![][![](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr2.png)](https://s3.eu-west-2.amazonaws.com/www.marcojr.com.br/pub/mr2.png)





