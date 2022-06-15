const jwt = require("jsonwebtoken")

const checkAuth =  function(req,res,next){
    let token = req.headers["x-Auth-token"]
  if (!token) token = req.headers["x-auth-token"]
  if(!token) return res.send({status:false, msg:"token must be present"})
  let decodedToken = jwt.verify(token, 'functionup-radon')

  if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
  
  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'you are not authorised, login with correct user id or password'})
  next()
}

module.exports.checkAuth = checkAuth