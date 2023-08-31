var express = require('express');
var router = express.Router();
// var mongoDbService = require("../service/mongodb")
var MemoryService = require("../modules/memory/memoryService")
var Response = require("../responseData/responseData")
var withAuth = require("../util/headerAuth")


router.get('/getListAll',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var result = await MemoryService.getMemoryList()
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});




router.get('/getStoryDetail/:id',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var id=req.params.id
    var result = await MemoryService.getStoryDetail(id)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.get('/getMyDetailStory/:id',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var id=req.params.id
    var result = await MemoryService.getStoryDetail(id)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});

router.get('/likeUnlikeAction/:id',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var obj={}
    obj.id=req.params.id
    obj.userID=req.user._id
    obj.name=req.user.name
    var result = await MemoryService.likeUnlikeAction(obj)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});





router.delete('/deleteComment/:id',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request={}
    request.deleteID=req.params.id.split(",")
    request.userInfo=req.user
    var result = await MemoryService.deleteComment(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.post('/getMyStoryList',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    // request.id=req.user._id
    request.id='64c7e76299967405921ba1c1'
    var result = await MemoryService.getMyStoryList(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});

router.post('/getStoryListAll',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var result = await MemoryService.getStoryListAll(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});



router.post('/myStoryMultipleAction',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request._id='64c7e76299967405921ba1c1'
    var result = await MemoryService.myStoryMultipleAction(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});

router.post('/adminStoryMultipleAction',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request._id=req.user._id
    var result = await MemoryService.adminStoryMultipleAction(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});








router.post('/sendComment',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request.id=req.user._id
    request.name=req.user.name
    request.profileImage=req.user.profileImage
    var result = await MemoryService.sendComment(request)
    console.log(result)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.post('/myStoryListStatus',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request.customerID=req.user._id
    request.name=req.user.name
    var result = await MemoryService.myStoryListStatus(request)
    console.log(result)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.post('/queryStatus',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request.customerID=req.user._id
    request.name=req.user.name
    var result = await MemoryService.queryStatus(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});



router.post('/create',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request.id=req.user._id
    request.name=req.user.name
    var result = await MemoryService.postMemory(request)
    console.log(result)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.post('/editComment',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    request._id=req.user._id
    request.name=req.user.name
    var result = await MemoryService.editComment(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


router.put('/editMyStory/:id',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var id=req.params.id
    var request=req.body
    var result = await MemoryService.editMyStory(id,request)
    console.log(result)
    res.json(result);
  }
  catch(e){
    ResponseData.getServerErrorResponseData(e)
  }
});


module.exports = router;
