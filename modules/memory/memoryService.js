var Memory=require("../../models/memory")
var MemoryDataprocessor=require("./memoryDataprocessor")
var ResponseData=require("../../responseData/responseData")
class MemoryService{
    async postMemory(request){
        var responseData = new ResponseData()
       try{
        var memory= new Memory()
        memory.userID=request.id
        memory.name=request.name
        memory.text=request.text
        memory.title=request.title
        var result=await MemoryDataprocessor.postMemory(memory)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
        
    }


    
    async getMemoryList(){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.getMemoryList()
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }


    async getMyStoryList(id){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.getMyStoryList(id)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async getStoryDetail(id){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.getStoryDetail(id)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }


    async editMyStory(id,request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.editMyStory(id,request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async editMyStory(id,request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.editMyStory(id,request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }


    async sendComment(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.sendComment(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async deleteComment(id){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.deleteComment(id)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    async editComment(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.editComment(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    
    async likeUnlikeAction(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.likeUnlikeAction(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async myStoryListStatus(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.myStoryListStatus(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    async queryStatus(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.queryStatus(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    async myStoryMultipleAction(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.myStoryMultipleAction(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async getStoryListAll(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.getStoryListAll(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    async adminStoryMultipleAction(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.adminStoryMultipleAction(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async adminActionDetail(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.adminActionDetail(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    async getAuthorList(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.getAuthorList(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    async adminStoryListStatus(request){
        var responseData = new ResponseData()
       try{
        var result=await MemoryDataprocessor.adminStoryListStatus(request)
        responseData.getSuccessResponseData(result)
       }
       catch(e){
        responseData.getFailResponseData(e)
       }
       return responseData
    }

    
    


    
}
module.exports=new MemoryService()