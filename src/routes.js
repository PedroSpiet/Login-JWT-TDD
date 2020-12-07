const routes = require('express').Router();
const { User } = require('./app/models');
const SessionController = require('./app/controllers/SessionsController');
const auth = require('./app/middlewares/auth');

routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})

module.exports = routes;