const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.encryptPassword = (password) => {
  var salt = crypto.randomBytes(16).toString("hex");
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: hash,
  };
};

exports.generateHash = (password, salt) => {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
};

exports.validatePassword = (passwordSalt, passwordHash, password) => {
  var hash = this.generateHash(password, passwordSalt);
  if (hash === passwordHash) {
    return true;
  } else {
    return false;
  }
};

exports.generateJwt = (claim, keys) => {
  var data = {
    exp: Math.floor(Date.now() / 1000) + authConfig.authTokenAge,
  };
  for (key in claim) {
    if (keys.includes(key)) {
      data[key] = claim[key];
    }
  }
  return jsonwebtoken.sign(data, authConfig.jwtSecret);
};

exports.verifyJwt = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({
      message: "Auth headers missing",
    });
  } else {
    var jwtToken = req.headers.authorization;
    jsonwebtoken.verify(jwtToken, authConfig.jwtSecret, (err, user) => {
      if (err) {
        res.status(403).json(err);
      } else {
        req.user = user;
        next();
      }
    });
  }
};
