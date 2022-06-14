
const headerValidation= function ( req, res, next) {
    let data = req.headers
    let headers = data["isfreeappuser"]
   
    if(!headers) {
    
        return res.send({status: false, message: "Header is required"})
    }
    

    next()
}

module.exports.headerValidation= headerValidation
