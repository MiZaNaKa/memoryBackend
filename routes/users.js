var express = require('express');
var router = express.Router();
var mongoDbService = require("../service/mongodb")
var userService=require("../modules/user/userService")
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var jwtHelper = require("../util/token")

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async(id, done) => {
  // const user = await User.findById(id)
  done(null, id)
})

passport.use(new GoogleStrategy({
  // clientID: '720939633946-nrcoj87vi154s8g5ev1eqj0mficj1gve.apps.googleusercontent.com',
  // clientSecret: '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',
  // callbackURL: "http://localhost:3000/users/auth/google/callback"

  clientID: '720939633946-lm8e9uaokfueho86u2vu30drf5nullh4.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3000/users/auth/google/callback"
},



async(accessToken, refreshToken, profile, cb)=> {
  var email =profile.emails[0].value
  var checkEmail = await userService.checkEmail(email)
  if(checkEmail.success.data.success.data.length===0){
    var request={
      email: profile.emails[0].value,
      name:profile.displayName,
      profileImage:profile.photos[0].value
    }
    var insert = await userService.insertUser(request)
    
    var request={
      isExist:true,
      userInfo:insert.success.data.success.data
    }
    return cb(null, request);
  }
  else{
    
    var request={
      isExist:true,
      userInfo:checkEmail.success.data.success.data[0]
    }
    return cb(null, request);
  }
  
}
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) =>{
    console.log(req)
    console.log(req.user.userInfo)
    console.log(req)
   
    if(req.user.isExist){
      var jwt=await jwtHelper.generateToken(req.user.userInfo)
      console.log(jwt)
      console.log(jwt)
      res.redirect('http://localhost:3006/SuccessfullyLogin/'+jwt);
    }
    else{
      // res.redirect('http://localhost:3006/SuccessfullyLogin/'+'45345');
    }
   
    // http://localhost:19006/SuccessfullyLogin
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/loginSuccessfully/:id', async (req, res, next)=> {
  
  var jwt = req.params.id;
  var verifyToken=await jwtHelper.verifyToken(jwt)
  var checkEmail = await userService.checkEmail(verifyToken.email)
  
  var jwt=await jwtHelper.generateToken(checkEmail.success.data.success.data[0])
  var result={
    userInfo:checkEmail.success.data.success.data[0],
    jwt:jwt
  }
 
  res.json(result);
});


router.post('/test',async function (req, res, next) {
  var request=req.body
  console.log(request)
  console.log(request)
  var result=await mongoDbService.db.collection("memory").insertOne(request)
  res.send(result);
  //res.json(result);
});

module.exports = router;
