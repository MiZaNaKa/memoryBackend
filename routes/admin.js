var express = require('express');
var router = express.Router();
var jwtHelper = require("../util/token")
var MemoryService = require("../modules/memory/memoryService")
var Response = require("../responseData/responseData")
var withAuth = require("../util/headerAuth")


router.post('/adminLogin',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    if(request.email==='khinlay.merryshall@gmail.com' && request.password=='Password123%'){
        var userInfo={
            _id:'295810kktkkt',
            name:'Khin Khin Thant',
            email:'khinlay.merryshall@gmail.com'
        }
        var jwt=await jwtHelper.generateToken(userInfo)
        var returnObj={
            jwt:jwt,
            userInfo:userInfo
        }
        res.json(returnObj);
    }
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


module.exports = router;
