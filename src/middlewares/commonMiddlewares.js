
const headerValidation= function ( req, res, next) {
    let headers = req.headers
    let appType = headers["isFreeAppUser"]
    if(!appType) {
        appType = headers["isfreeappuser"]
    }
    if(!appType) {
    
        return res.send({status: false, message: "Header is required"})
    }
    //This is for order creation.
    if(appType == 'true') {
        req.appTypeFree = true
    } else {
        req.appTypeFree = false
    }

    next()
}

module.exports.headerValidation= headerValidation
