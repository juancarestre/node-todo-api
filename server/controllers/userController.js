const { User } = require('../models/user');
const _ = require('lodash');

const getUser = (req, res) => {
    res.send(req.user);
};

const createUser = async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.sendStatus(400).send();
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.sendStatus(400).send();
    }
};

module.exports = {
    getUser,
    createUser,
    loginUser,
    deleteUser,
};
