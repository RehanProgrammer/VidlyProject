const express = require("express");
const Router = express.Router();
const User = require("../collections/user");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

Router.get("/", (req, res) => {
  res.send("Register user version");
});

Router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password"); //exclude password property when retrieving
  res.send(user);
});

Router.post("/", async (req, res) => {
  let { error, value } = validateUser(req.body);
  if (!error) {
    let email = await User.findOne({ email: value.email });
    if (email) {
      console.log(`${email} exists`);
      res.status(400).send(`${email} already exists`);
      return;
    }

    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user
      .save()
      .then(result => {
        //console.log(result);
        result = _.pick(result, ["name", "email"]);
        console.log(result);
        const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
        res
          .status(200)
          .header("x-auth-token", token)
          .send(JSON.stringify(result) + " has been saved in the DB");
      })
      .catch(e => {
        console.log("i am being executed");
        console.error(e.details[0].message);
        res.status(400).send(e.details[0].message);
      });
  } else {
    res.status(404).send(error.details[0].message);
    return;
  }
});

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().required()
  };
  const { error, value } = Joi.validate(user, schema);
  return { error, value };
}

module.exports = Router;
