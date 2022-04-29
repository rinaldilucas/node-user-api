const User = require('../models/user.model.js');

exports.findAll = (request, response) => {
    User.find()
        .then((users) => {
            response.json(users);
        })
        .catch((error) => {
            response.status(500).send({
                message: error.message,
            });
        });
};

exports.findById = (request, response) => {
    User.findById(request.params._id)
        .then((user) => {
            if (!user) {
                return response.status(404).json({
                    message: 'User not found with id ' + request.params._id,
                });
            }
            response.json(user);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return response.status(404).json({
                    message: 'User not found with id ' + request.params._id,
                });
            }
            return response.status(500).json({
                message: 'Error retrieving User with id ' + request.params._id,
            });
        });
};

exports.findByEmail = (request, response) => {
    User.findOne({ email: request.params.email })
        .then((user) => {
            if (!user) {
                return response.status(404).json({
                    message: 'User not found with email ' + request.params.email,
                });
            }
            response.json(user);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return response.status(404).json({
                    message: 'User not found with email ' + request.params.email,
                });
            }
            return response.status(500).json({
                message: 'Error retrieving User with email ' + request.params.email,
            });
        });
};

exports.findByUsername = (request, response) => {
    User.findOne({ username: request.params.username })
        .then((user) => {
            if (!user) {
                return response.status(404).json({
                    message: 'User not found with username ' + request.params.username,
                });
            }
            response.json(user);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return response.status(404).json({
                    message: 'User not found with username ' + request.params.username,
                });
            }
            return response.status(500).json({
                message: 'Error retrieving User with username ' + request.params.username,
            });
        });
};

exports.create = (request, response) => {
    const user = new User(request.body);
    user.save()
        .then((data) => {
            response.json(data);
        })
        .catch((error) => {
            response.status(500).json({
                message: error.message,
            });
        });
};

exports.update = (request, response) => {
    User.findByIdAndUpdate(request.body._id, request.body, { new: true })
        .then((user) => {
            if (!user) {
                return response.status(404).json({
                    message: 'User not found with id ' + request.params._id,
                });
            }
            response.json(user);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return response.status(404).json({
                    message: 'User not found with id ' + request.params._id,
                });
            }
            return response.status(500).json({
                message: 'Error updating user with id ' + request.params._id,
            });
        });
};

exports.delete = (request, response) => {
    User.findByIdAndRemove(request.params._id)
        .then(
            (user) => {
                if (!user) {
                    return response.status(404).json({
                        message: 'User not found with id ' + request.params._id,
                    });
                }
                response.json({ message: 'User deleted successfully!' });
            },
            { useFindAndModify: false },
        )
        .catch((error) => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return response.status(404).json({
                    message: 'User not found with id ' + request.params._id,
                });
            }
            return response.status(500).json({
                message: 'Could not delete user with id ' + request.params._id,
            });
        });
};
