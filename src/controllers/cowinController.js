let axios = require("axios")
const { text } = require("body-parser")

let districtById = async function(req,res){
   try{
    let districtId = req.query.district_id
    let date = req.query.date
    let options = {
        method:'get',
        url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
    }
    let result = await axios(options)
    res.status(200).send({msg:result.data})
}
catch(err){
    console.log(err)
    res.status(500).send({msg:err.message})
}
}

let citySortingByTemp= async function(req,res){
    // userid: gurucharanmanjhizx@gmail.com password:Job@7563
    try{
    let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
    let arrayofcity = []
    for (let i=0; i<cities.length; i++){
   let obj = {city:cities[i]}
   
   let appid = req.query.APPID
    let options ={
        method:'get',
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&APPID=${appid}`
    }
    let result = await axios(options)
    obj.temp= result.data.main.temp
    arrayofcity.push(obj)
    
}
let sortedtemp = arrayofcity.sort(function(a,b){return a.temp - b.temp})
res.status(200).send({msg:sortedtemp})
    }catch(err){
        console.log(err)
        res.status(500).send({msg:arr.message})
    }
}

let memesChallenge = async function(req,res){
  try{  let id = req.body.template_id
    let text1 = req.body.text0
    let text2 = req.body.text1
    let username=req.body.username
    let password = req.body.password
    let options = {
        method:'post',
        url:`https://api.imgflip.com/caption_image?template_id=${id}&text0=${text1}&text1=${text2}&username=${username}&password=${password}`
    }
    let result = await axios(options)
    res.status(200).send({msg:result.data})
} catch(err){
    console.log(err)
    res.status(500).send({msg:err.message})
}
}

module.exports.districtById = districtById
module.exports.citySortingByTemp = citySortingByTemp
module.exports.memesChallenge = memesChallenge