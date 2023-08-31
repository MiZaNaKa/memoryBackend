var userDataprocessor = require("./userDataprocessor")
var User = require("../../models/users")
var ResponseData=require("../../responseData/responseData")
const { v4: uuidv4 } = require('uuid')

class userService{
    async insertUser(request){
        var responseData=new ResponseData()
        try{
            var userInfo=new User()
            userInfo.name=request.name
            userInfo.email=request.email
            userInfo.profileImage=request.profileImage
            userInfo.password=uuidv4()
            userInfo.createDate
            
            var result=await userDataprocessor.insertUser(userInfo)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    
    async checkEmail(email){
        var responseData=new ResponseData()
        try{
           
            var result=await userDataprocessor.checkEmail(email)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }
}
module.exports=new userService()

