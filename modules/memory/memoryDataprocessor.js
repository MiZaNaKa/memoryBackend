const { ObjectId } = require('mongodb');
const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
var ObjectID = require('mongodb').ObjectID;
const { v4: uuidv4 } = require('uuid');
class memoryDataprocessor{

    async postMemory(value){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('memory').insertOne(value)
           
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    async getMemoryList(){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('memory').find({"status":2}).toArray()
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async getMyStoryList(request){
        var responseData = new Response()
        try{
            
            if(!request.search){
                if(request.status==='2'){
                    request.status=3
                }
                if(request.status==='1'){
                    request.status=1
                }
                if(request.status==='3'){
                    request.status=2
                }
                
                var result=await mongoDbService.db.collection('memory').find({"userID":request.id,"status":request.status}).toArray()
            }
            else{
                if(request.status==='2'){
                    request.status=3
                }
                if(request.status==='1'){
                    request.status=1
                }
                if(request.status==='3'){
                    request.status=2
                }
                
                var result = await mongoDbService.db.collection('memory')
                .find({
                    "userID":request.id,
                    "status":request.status,
                    'title': { $regex: request.search, $options: 'i' }
                })
                .toArray();
            }
            
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    async getStoryDetail(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(id) })
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    async editMyStory(id,request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('memory')
            .updateOne(
                { "_id": ObjectID(id) },
                {
                    $set: {
                        "title": request.title,
                        "text":request.text
                    }
                }
            );
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async sendComment(request){
        var responseData = new Response()
        try{
            var insertObj={
                userID:request.id,
                userName:request.name,
                date:new Date(),
                profileImage:request.profileImage,
                comments:request.comment,
                _id:uuidv4()
            }
            var result=await mongoDbService.db.collection('memory')
            .updateOne(
                { "_id": ObjectID(request._id) },
                {
                    $push: {
                        "comment": insertObj
                    }
                }
            );
            var result=await mongoDbService.db.collection('memory')
            .findOne({ "_id": ObjectID(request._id) });
            responseData.getSuccessResponseData(result)
        }

        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async deleteComment(request){
        var responseData = new Response()
        try{
            var find=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.deleteID[0]) })

            var finMyDetailComment=find.comment.filter(x=>x._id==request.deleteID[1] && x.userID===request.userInfo._id)
            

            if(finMyDetailComment.length>0){
                var allComment=find.comment.filter(x=>x._id!==request.deleteID[1])
                var updated=await mongoDbService.db.collection('memory')
                .updateOne(
                    { "_id": ObjectID(request.deleteID[0]) },
                    {
                        $set: {
                            "comment": allComment
                        }
                    }
                );
                var result=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.deleteID[0]) })
                
                responseData.getSuccessResponseData(result)
            }
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async editComment(request){
        var responseData = new Response()
        try{
            var find=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
            
            

            var finMyDetailComment=find.comment.filter(x=>x._id==request.commentID && x.userID===request._id)
            

            if(finMyDetailComment.length>0){
                const index = find.comment.findIndex(object => {
                    return object._id === request.commentID;
                });
                find.comment[index].comments=request.comment
                  
                var allComment=find.comment.filter(x=>x._id!==request.commentID)
                var updated=await mongoDbService.db.collection('memory')
                .updateOne(
                    { "_id": ObjectID(request.id) },
                    {
                        $set: {
                            "comment": find.comment
                        }
                    }
                );
                var result=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
                responseData.getSuccessResponseData(result)
            }
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    async likeUnlikeAction(request){
        var responseData = new Response()
        try{
            var find=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
            
            var finMyDetailComment=find.like.filter(x=>x===request.userID)
            var total=find.like
           
            if(finMyDetailComment.length==0){
                total.push(request.userID)
                
            }
            else{
                var filter=total.filter(x=>x!==request.userID)
                
                total=filter
            }

           
            
            
            var updated=await mongoDbService.db.collection('memory')
            .updateOne(
                { "_id": ObjectID(request.id) },
                {
                    $set: {
                        "like": total
                    }
                }
            );
            var result=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
                
            responseData.getSuccessResponseData(result)
           
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async myStoryListStatus(request){
        var responseData = new Response()
        try{
            var find=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
            
           
            if(find.userID === request.customerID){
                
                if(request.status==='5'){
                    var updated=await mongoDbService.db.collection('memory')
                    .updateOne(
                        { "_id": ObjectID(request.id) },
                        {
                            $set: {
                                "status": 3
                            }
                        }
                    );
                }
                else if(request.status==='4'){
                    var updated=await mongoDbService.db.collection('memory')
                    .deleteOne({ "_id": ObjectID(request.id)})
                }
                else if(request.status==='7'){
                    var updated=await mongoDbService.db.collection('memory')
                    .updateOne(
                        { "_id": ObjectID(request.id) },
                        {
                            $set: {
                                "status": 1
                            }
                        }
                    );
                }
            }
           
           
            var result=await mongoDbService.db.collection('memory').find({"userID":request.customerID,"status":1}).toArray()
                
            responseData.getSuccessResponseData(result)
           
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }


    
    async queryStatus(request){
        var responseData = new Response()
        try{
            var find=await mongoDbService.db.collection('memory').findOne({"_id":ObjectId(request.id) })
            if(find.userID === request.customerID){
                
                if(request.status==='5'){
                    var updated=await mongoDbService.db.collection('memory')
                    .updateOne(
                        { "_id": ObjectID(request.id) },
                        {
                            $set: {
                                "status": 3
                            }
                        }
                    );
                }
                else if(request.status==='4'){
                    var updated=await mongoDbService.db.collection('memory')
                    .deleteOne({ "_id": ObjectID(request.id)})
                }
            }
            var result=await mongoDbService.db.collection('memory').find({"userID":request.customerID,"status":1}).toArray()
                
            responseData.getSuccessResponseData(result)
           
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }


    
    async myStoryMultipleAction(request){
        var responseData = new Response()
        try{
            for(var i=0;i<request.id.length;i++){
                var id =request.id[i]
                if(request.status=='3' || request.status==3){
                    var updated=await mongoDbService.db.collection('memory')
                    .deleteOne({ "_id": ObjectID(id)})
                }
                else{
                    if(request.status==='1' || request.status===1){
                        var StatusT=3
                    }else{
                        var StatusT=1
                    }
                    var update = await mongoDbService.db.collection('memory')
                    .updateOne(
                        { "_id": ObjectID(id) },
                        {
                            $set: {
                                "status": StatusT,
                            }
                        }
                    );
                }
            }
            var result=await mongoDbService.db.collection('memory').find({"userID":request._id,"status":1}).toArray()
                
            responseData.getSuccessResponseData(result)
           
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    
    async adminStoryMultipleAction(request){
        var responseData = new Response()
        try{
            for(var i=0;i<request.id.length;i++){
                var id =request.id[i]
                console.log(request.status)
                console.log(request.status)
                console.log(request.status)
                if(request.status=='2' || request.status==2){
                    var updated=await mongoDbService.db.collection('memory')
                    .deleteOne({ "_id": ObjectID(id)})
                }
                else{
                    if(request.status===3){
                        request.status=4
                    }
                    else if(request.status===4){
                        request.status=1
                    }
                    else{
                        request.status=2
                    }
                    var update = await mongoDbService.db.collection('memory')
                    .updateOne(
                        { "_id": ObjectID(id) },
                        {
                            $set: {
                                "status": request.status
                            }
                        }
                    );
                }
            }
            var result=await mongoDbService.db.collection('memory').find({"status":1}).toArray()
                
            responseData.getSuccessResponseData(result)
           
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

    

    async getStoryListAll(request){
        var responseData = new Response()
        try{
            
            if(!request.search){
                if(request.status==='2'){
                    request.status=3
                }
                if(request.status==='1'){
                    request.status=1
                }
                if(request.status==='3'){
                    request.status=2
                }
                if(request.status==='4'){
                    request.status=4
                }
                
                var result=await mongoDbService.db.collection('memory').find({"status":request.status}).toArray()
            }
            else{
                if(request.status==='2'){
                    request.status=3
                }
                if(request.status==='1'){
                    request.status=1
                }
                if(request.status==='3'){
                    request.status=2
                }
                if(request.status==='4'){
                    request.status=4
                }
                
                var result = await mongoDbService.db.collection('memory')
                .find({
                    
                    "status":request.status,
                    'title': { $regex: request.search, $options: 'i' }
                })
                .toArray();
            }
            
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getFailResponseData(e)
        }
        return responseData
    }

}

module.exports=new memoryDataprocessor()