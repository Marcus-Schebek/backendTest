const express = require('express');
const request = require('request');
const app = express();

class GitHubAPI {
    getUsers(req, res) {
        const since = req.query.since;
        const perPage = req.query.per_page || 40; 
        const page = req.query.page || 1; 

        const options = {
            url: `https://api.github.com/users?since=${since}&per_page=${perPage}&page=${page}`,
            headers: {
                'User-Agent': 'my-user'
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                res.status(500).send(error);
            } else {
                const users = JSON.parse(body);
                res.send(users);
            }
        });
    }

    getUserProfile(req, res) {
        const login = req.params.login;

        const options = {
            url: `https://api.github.com/users/${login}`,
            headers: {
                'User-Agent': 'my-user'
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                res.status(500).send(error);
            } else {
                const user = JSON.parse(body);
                res.send(user);
            }
        });
    }

    getUserRepositories(req, res) {
        const login = req.params.login;
        const perPage = req.query.per_page || 20; 
        const page = req.query.page || 1; 

        const options = {
            url: `https://api.github.com/users/${login}/repos?per_page=${perPage}&page=${page}`,
            headers: {
                'User-Agent': 'my-user'
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                res.status(500).send(error);
            } else {
                const repositories = JSON.parse(body);
                res.send(repositories);
            }
        });
    }
}

const gitHubAPI = new GitHubAPI();

app.get('/users', gitHubAPI.getUsers);
app.get('/users/:login', gitHubAPI.getUserProfile);
app.get('/users/:login/repositories', gitHubAPI.getUserRepositories);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));
module.exports = app