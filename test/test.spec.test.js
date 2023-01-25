const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const app = require('../index')
const port = process.env.PORT || 3000;
const should = chai.should();

chai.use(chaiHttp);
chai.request(app);

  describe('GET /users', () => {
    it('it should GET all the users starting from a given id', (done) => {
      chai.request(server)
          .get('/users?since=100')
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.have.property('login');
                res.body[0].should.have.property('id');
            done();
          });
    });
  });

  describe('GET /users/:login', () => {
    it('it should GET the details of a specific user profile', (done) => {
      chai.request(server)
          .get('/users/octocat')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('login');
            res.body.should.have.property('name');
            res.body.should.have.property('location');
            res.body.should.have.property('email');
            res.body.should.have.property('followers');
            res.body.should.have.property('following');
            res.body.should.have.property('public_repos');
        done();
      });
});
});

describe('GET /users/:login/repositories', () => {
it('it should GET all the repositories of a specific user', (done) => {
  chai.request(server)
      .get('/users/octocat/repositories')
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('full_name');
            res.body[0].should.have.property('description');
            res.body[0].should.have.property('language');
            res.body[0].should.have.property('forks_count');
            res.body[0].should.have.property('stargazers_count');
            res.body[0].should.have.property('open_issues_count');
            res.body.length.should.be.at.most(20);
        done();
      });
});
});

