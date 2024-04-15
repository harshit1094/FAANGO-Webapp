const jwt = require("jsonwebtoken");

exports = {};

exports.getToken =  (email, user) => {
  const token = jwt.sign(
    { identifier: user._id },
    process.env.secretOrKey
  );
  return token;
};
module.exports = exports;
