//Problem2 Solution
const printDate = function(){
   let currentDate = new Date()
   console.log("current Date is : " , currentDate) 
}

const printMonth = function(){
    let currentDate = new Date()
    console.log("Current month is :", currentDate.getMonth()+1)
}

const getBatchInfo = function(){
    console.log("Radon, W3D3, the topic for today is Nodejs module system")
}


module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo=getBatchInfo;