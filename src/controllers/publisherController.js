const publisherModel = require('../models/publisherModel')

const createPublisher = async function(req, res){
    let pubData = req.body
    let savedData = await publisherModel.create(pubData)
    res.send({msg:savedData})
}

module.exports.createPublisher = createPublisher