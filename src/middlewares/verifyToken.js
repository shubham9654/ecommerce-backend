const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authToken = req.headers?.token?.split(' ') && req.headers.token.split(' ')[1];
    if (authToken) {
      jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) res.status(403).json({ errMsg: "Invalid Token!" })
        req.user = user;
        next();
      })
    } else {
      res.status(401).json({ errMsg: "you are not authenticated" })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ errMsg: err });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ errMsg: "user not allowed"})
      }
    })
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ errMsg: "user not allowed"})
      }
    })
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
}
