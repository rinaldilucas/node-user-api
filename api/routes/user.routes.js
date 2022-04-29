module.exports = function (app) {
    const users = require('../controllers/user.controller.js');

    // GET ALL
    app.get('/api/users', users.findAll);

    // GET
    app.get('/api/users/:_id', users.findById);
    app.get('/api/users/email/:email', users.findByEmail);
    app.get('/api/users/username/:username', users.findByUsername);

    // CREATE
    app.post('/api/users', users.create);

    // UPDATE
    app.put('/api/users', users.update);

    // DELETE
    app.delete('/api/users/:_id', users.delete);
};
