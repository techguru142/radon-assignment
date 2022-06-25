const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const { default: isBoolean } = require("validator/lib/isBoolean")
const jwt = require('jsonwebtoken')


const createBlog = async function (req, res) {
  try {
    let receivedData = req.body
    //title is mandatory
    if (!receivedData.title) { return res.status(400).send({ status: false, msg: "title is missing" }) }
    //if title is present then please check
    if(receivedData.title){
      if(receivedData.title.trim().length==0 ) return res.status(400).send({status:false,msg:"emty space is not allowed"})
      if(!isNaN(receivedData.title)){ return res.status(400).send({status:false, msg:"title can not be a number only"})}
      let titleTrim = /^[^ ][\w\W ]*[^ ]/
      if (!titleTrim.test(receivedData.title)) { return res.status(400).send({ status:false, msg: "Title have white space at begining or end" }) }
    }
    //body is mandatory
    if (!receivedData.body) { return res.status(400).send({ status: false, msg: "body is missing" }) }
     //if body is present then please check
    if(receivedData.body){
      if(receivedData.body.trim().length==0 ) return res.status(400).send({status:false,msg:"empty space is not allowed"})
      if(!isNaN(receivedData.body)){ return res.status(400).send({status:false, msg:"Body can not be a number only"})}
      let bodyTrim = /^[^ ][\w\W ]*[^ ]/
       if (!bodyTrim.test(receivedData.body)) { return res.status(400).send({ status:false, msg: "body have white space at begining or end" }) }
    }
    //catagory is mandatory
    if (!receivedData.catagory) { return res.status(400).send({ status: false, msg: "catagory is missing" }) }
    if(receivedData.catagory){
    if (typeof receivedData.catagory != "object") { res.status(400).send({ status:false, msg: "catagory should be in form of Array" }) }
    if(!isNaN(receivedData.catagory)){return res.status(400).send({status:false, msg:"catagory can not be empty or number only"})}
    let categoryTrim = /^[^ ][\W\w ]*[^ ]/
    if (categoryTrim.test(receivedData.subCategory)) { return res.status(400).send({ status: false, msg: "catagory contains white space at begining or end"}) }
    }
    if(receivedData.subCatagory){
    if (typeof receivedData.subCatagory != "object") { res.status(400).send({ status:false, msg: "Subcatagory should be in form of Array" }) }
    if(!isNaN(receivedData.subCatagory )){return res.status(400).send({status:false, msg:"subCatagory can not be a number only or empty"})}
    let subcategoryTrim = /^\s*(\S(.*\S)?)\s*$/
    if (!subcategoryTrim.test(receivedData.subCategory)) { return res.status(400).send({ status: false, msg: "subCatagory contains white space at begining or end"}) }
    }
    //tag validation
    if (typeof receivedData.tags != "object") { res.status(400).send({ status:false, msg: "Tags should be in form of Array" }) }
    if (receivedData.tags) {
      if(!isNaN(receivedData.tags)){return res.status(400).send({status:false, msg:"tags can not be a number only or empty"})}
      let tagsTrim =/^[^ ][\w\W ]*[^ ]/
       if (!tagsTrim.test(receivedData.tags)) { return res.status(400).send({ status:false, msg: "tags have white space at begining or end" }) }
   }
  
  if(!isBoolean(receivedData.isDeleted)){return res.status(400).send({status:false, msg:"It should be only boolean value"})}
  if(!isBoolean(receivedData.isPublished)){return res.status(400).send({status:false, msg:"It should be only boolean value"})}
    //authorId is mandatory
    if (!receivedData.authorId) { return res.status(400).send({ status: false, msg: "author id is missing" }) }
    //author id validation check
    if(receivedData.authorId){
    let authorid= receivedData.authorId
    let authorId = await authorModel.findById({ _id:authorid})
    if (!authorId) { return res.status(400).send("invalid author id") }
    }
    //once all condition sutisfied successfully then data will be created
    let createdBlogData = await blogModel.create(receivedData)
    res.status(201).send({status:true, data:createdBlogData})
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

const getBlogData = async function (req, res) {
  try{
    let token = req.headers["X-Api-Key"]
    if (!token) token = req.headers["x-api-key"]
    if(!token) return res.status(404).send({status:false, msg:"token must be present"})
    let decodedToken = jwt.verify(token, 'project-blog')
    if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
    let authorToBeModifiedByQuery=req.query.authorId
    //userId for the logged-in user
    let authorLoggedIn = decodedToken.authorId
    //userId comparision to check if the logged-in user is requesting for their own data
    if(authorToBeModifiedByQuery != authorLoggedIn) return res.status(401).send({status: false, msg: 'you are not authorised, login with correct user id or password'})
if( authorToBeModifiedByBody != authorLoggedIn ) return res.status(401).send({status: false, msg: 'you are not authorised, login with correct user id or password'})
    let spaceIn = Object.keys(req.query)
    if(!spaceIn[00].trim()){}
    let authorId = req.query.authorId
  if (authorId) {
    let savedAuthorData = await authorModel.findById({ _id: authorId })
    if (!savedAuthorData) return res.status(400).send({ status: false, msg: "invalid author id" })
  }
  let savedBlogData = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorId }, { tags: req.query.tags }, { catagory: req.query.catagory }, { subCatagory: req.query.subCatagory }] })
  // when no one data exits
  if (savedBlogData.length == 0) { return res.status(404).send({ status: false, msg: "Data not founds" }) }
  res.status(200).send({ status: true, data: savedBlogData })
}catch(err){
  res.status(500).send({msg:"Error", error:err.message})
}
}

//put Api
const updateBlog = async function (req, res) {
  try {
    let token = req.headers["X-Api-Key"]
    if (!token) token = req.headers["x-api-key"]
    if(!token) return res.status(404).send({status:false, msg:"token must be present"})
    let decodedToken = jwt.verify(token, 'project-blog')
if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})

//userId for which the request is made. In this case message to be posted.
let authorToBeModifiedByBody= req.body.authorId
if(Object.keys(req.body).length ==0){
return res.status(400).send({status: false, msg: 'body is empty'})
}
//userId for the logged-in user
let authorLoggedIn = decodedToken.authorId
if( authorToBeModifiedByBody != authorLoggedIn ) return res.status(401).send({status: false, msg: 'you are not authorised, login with correct user id or password'})
      let id = req.params.blogId
      let blog = await blogModel.findById(id)
      if (!blog) {
          res.status(404).send({ status:false, msg: "No such blogID exists" })
      }
      if (blogModel.isDeleted != true) {
          let title = req.body.title
          if (!title) { res.status(400).send({ status:false, msg: "Title is missing" }) }
          if (title) {
              let titleValidation = /^[-a-z0-9,\/()&:. ]*[a-z][-a-z0-9,\/()&:. ]*$/i
              if (!titleValidation.test(title)) { return res.status(400).send({ status:false, msg: "Invalid title" }) }
          }



          let body = req.body.body
          if (!body) { res.status(400).send({ status:false, msg: "Body is missing" }) }
          if (body) {
              let bodyValidation = /^[-a-z0-9,\/()&:. ]*[a-z][-a-z0-9,\/()&:. ]*$/i
              if (!bodyValidation.test(body)) { return res.status(400).send({ status: false, msg: "Invalid body format" }) }
          }

          let tags = req.body.tags
          if (!tags) { res.status(400).send({ status: "false", msg: "Tags are missing" }) }
          if (typeof tags != "object") { res.status(400).send({ status:false, msg: "Tags should be in form of Array" }) }

          if (tags) {
              let tagValidation = /^#?[a-zA-Z0-9]+/gm
              if (!tagValidation.test(tags)) { return res.status(400).send({ status:false, msg: "Invalid tags" }) }
              let flag;
              if(tagValidation){
                  for(let i=0;i<tags.length;i++)
                  {
                      if(tags[i].trim().length===0){
                          flag = "true"
                          break;
                      }
                  }
              }
              if(flag==="true") {return res.status(400).send({status:false,msg:"Tags can't contain empty values"})}
          }


          let subcategory = req.body.subcategory
          if (!subcategory) { res.status(400).send({ status: "false", msg: "Subcategory is missing" }) }
          if (typeof subcategory != "object") { res.status(400).send({ status:false, msg: "Subcategories should be in form of Array" }) }

          if (subcategory) {
              let subcategoryValidation = /^#?[a-zA-Z0-9]+/gm
              if (!subcategoryValidation.test(subcategory)) { return res.status(400).send({ status: false, msg: "Invalid subcategory" }) }
              let flag;
              if(subcategoryValidation){
                  for(let i=0;i<tags.length;i++)
                  {
                      if(subcategory[i].trim().length===0){
                          flag = "true"
                          break;
                      }
                  }
              }
              if(flag==="true") {return res.status(400).send({status:false,msg:"Subcategory can't contain empty values"})}
          }


          let updateData = await blogModel.findOneAndUpdate({ "_id": id }, {
              $set: {
                  title: title,
                  body: body,
                  publishedAt: new Date(),
                  isPublished: true
              }
          })

          let updatedData = await blogModel.findOneAndUpdate({ "_id": id },
              { $push: { tags: tags, subcategory: subcategory } }, { new: true })
          res.status(200).send({ status: true, data: updatedData })
      }
      else {
          res.status(404).send({ status: false, msg: "data not found" })
      }

  }

  catch (err) {
      console.log(err)
      res.status(500).send({ status: "false", msg: "", error: err.message })
  }

}
//Delete api
const deleteByParams = async function (req, res) {
  try {
    let token = req.headers["X-Api-Key"]
    if (!token) token = req.headers["x-api-key"]
    if(!token) return res.status(404).send({status:false, msg:"token must be present"})
    let decodedToken = jwt.verify(token, 'project-blog')
if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
//userId for which the request is made. In this case message to be posted.
let authorToBeModified = req.params.authorId
//userId for the logged-in user
let authorLoggedIn = decodedToken.authorId
if( authorToBeModified != authorLoggedIn ) return res.status(401).send({status: false, msg: 'you are not authorised, login with correct user id or password'})
    let spaceIn = Object.keys(req.query)
    if(!spaceIn[00].trim()){}
    let blogId = req.params.blogId
    let savedBlogData = await blogModel.findById({ _id: blogId })
    //if blogid is valid
    if (savedBlogData) {
      let deletedData = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, {
         new: true })
      if (deletedData = null) {return res.status(404).send({ status: false, msg: "data not found" })}
        res.status(200).send(deletedData)
      
    } else return res.status(400).send({ status: false, msg: "blog id does not exits" })
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

const deleteByQueryParams = async function (req, res) {
  try { 
    let token = req.headers["X-Api-Key"]
    if (!token) token = req.headers["x-api-key"]
    if(!token) return res.status(404).send({status:false, msg:"token must be present"})
    let decodedToken = jwt.verify(token, 'project-blog')
    if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
    
    let authorToBeModifiedByQuery=req.query.authorId
    //userId for the logged-in user
    let authorLoggedIn = decodedToken.authorId
    //userId comparision to check if the logged-in user is requesting for their own data
  
    if(authorToBeModifiedByQuery != authorLoggedIn) return res.status(401).send({status: false, msg: 'you are not authorised, login with correct user id or password'})
  
    let spaceIn = Object.keys(req.query)
    if(!spaceIn[00].trim()){}
    let tags = req.query.tags
    let isPublished = req.query.isPublished
    let catagory = req.query.catagory
    let authorid = req.query.authorId
    
    //validate author id
    if (authorid) {
      let savedBlogData = await authorModel.findById({ _id: authorid })
      if (!savedBlogData) { return res.status(400).send({ status: false, msg: "author id does not exits" }) }
    }
   //if(isPublished = false){
    let deletedData = await blogModel.findOneAndUpdate(
      {
       isDeleted:false, $or: [{ catagory: catagory }, { authorId: authorid }, { tags: tags }, { isPublished: false }]
      }, { isDeleted: true, deletedAt: new Date() }, { new: true })
  
    //if there is no data then it will retun an error
    if (!deletedData) { return res.status(404).send({ status: false, msg: "Data not found" }) }
    res.status(200).send(deletedData)
  // }else{return res.status(400).send({status:false, msg:"isPublished true can not be accepted "})}
  }
  catch (err) {
    return res.status(500).send({ msg: "error", error: err.message })
  }
}
module.exports.createBlog = createBlog;
module.exports.getBlogData = getBlogData;
module.exports.updateBlog = updateBlog;
module.exports.deleteByParams = deleteByParams;
module.exports.deleteByQueryParams = deleteByQueryParams;

