const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
class userDataprocessor{
    async insertUser(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('users').insertOne(request)
            var insert=await mongoDbService.db.collection('users').findOne({"email":request.email})
            console.log(insert)
            console.log(insert)
            responseData.getSuccessResponseData(insert)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async checkEmail(email){
        var responseData = new Response()
        try{
            console.log(email)
            console.log(email)
            var result=await mongoDbService.db.collection('users').find({"email":email}).toArray()
            console.log(result)
            console.log(result)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            console.log(e.message)
            console.log(e)
            console.log(e)
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    
}

module.exports=new userDataprocessor()