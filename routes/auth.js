const express = require('express');
const Router = express.Router();
const Joi = require('joi');
const User = require('../collections/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


Router.get('/', (req, res) => {
    res.send('welcome to auth version');
});

Router.post('/', async (req, res) => {
    const { error, value } = validateUserAuthVersion(req.body);
    if (error) return res.status(400).send('bad request');
    let user = await User.findOne({ email: value.email });
    if (!user) return res.status(400).send('email address or password not found');
    let authPass = await bcrypt.compare(value.password, user.password);
    if (!authPass) return res.status(400).send('email address or password not found');

    const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    res.send(token);

});

function validateUserAuthVersion(user) {
    const schema = {
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
    }
    const { error, value } = Joi.validate(user, schema);
    return { error, value };
}


module.exports = Router;