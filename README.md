
# Using the GitHub API

This API was developed to obtain information about users and repositories on GitHub.

### Available routes

 - `GET /users` - Obtains a list of users starting from the id passed as a parameter since. By default, it returns up to 40 users per page.

 - `GET /users/:login` - Obtains the profile details of a specific user, based on the login passed as a parameter.

 - `GET /users:login/repositories` - Obtains a list of repositories of a specific user, based on the login passed as a parameter. By default, it returns up to 20 repositories per page.

 ### How to use ?

1. Download or clone this repository on your machine.

2. Install the necessary dependencies by running the command `npm install` in the project's root folder.
    
3. Start the server by running the command `npm start`.

4. The routes will be available at the URL http://localhost:3000/.


### API call examples

* Obtains a list of users starting from id 100:

        GET http://localhost:3000/users?since=100

* Obtains the profile details of the user with login "Marcus-Schebek":

        GET http://localhost:3000/users/Marcus-Schebek

* Obtains a list of repositories of the user with login "Marcus-Schebek":

        GET http://localhost:3000/users/Marcus-Schebek/repositories

* Obtains a list of repositories of the user with login "Marcus-Schebek" limiting to 5 repositories per page::

        GET http://localhost:3000/users/Marcus-Schebek/repositories?per_page=5
        
        
## Testing the API
To test your API, you can use a testing library like Mocha and Chai.

### Installing dependencies

Before you start writing tests, you will need to install Mocha and Chai as dev dependencies for your project. To do this, run the following command in your terminal:

	`npm install --save-dev mocha chai chai-http`
	
### Writing tests

Tests should be written in a separate file, usually called test.js or test.spec.js. In this file, you can write multiple tests, each checking a specific behavior of your API.

For each test, you should import chai and chai-http, and pass express as parameter to chai.request

		
		const chai = require('chai');
		const chaiHttp = require('chai-http');
		const app = require('../index');

		chai.use(chaiHttp);
		const should = chai.should();	
		const server = chai.request(app);

Then, you can use the methods provided by Chai HTTP to make requests to your API and check if the response is as expected. For example, to test if the route /users returns an array of users, you can write the following test:

	
        describe('GET /users', () => {
        it('it should GET all the users starting from a given id', (done) => {
      chai.request(server)
          .get('/users?since=100')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('login');
                res.body[0].should.have.property('id');
            done();
          });
    });
    });


### Running tests

To run the tests, you can add a script in the package.json file, like this:

        "scripts": {
        "test": "mocha test/*.test.js"
        }
And then run the command `npm test`.

### Checking Result

If everything is set correctly, Mocha should run all the tests and show the result on the screen. If all tests pass, you will see a message indicating that all tests passed. If any tests fail, you will see the error message and description of the failed test.

It's important to verify that the API is working correctly before proceeding with development, to ensure that the new features are working correctly and not causing problems in other parts of the application.