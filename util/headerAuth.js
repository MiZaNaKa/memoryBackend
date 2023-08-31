const moment = require('moment');
var jwtHelper = require("./token")

async function ensureAuthenticated (req, res, next) {

    if (!req.headers.authorization) {
       return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    // var token = req.headers.authorization.split(' ')[1];
    var token = req.headers.authorization;
  
    var payload = null;
    try {
        payload = await jwtHelper.verifyToken(token,'secret')
     
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }
  
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload;
    next();
}

module.exports = ensureAuthenticated;