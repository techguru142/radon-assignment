const express = require('express');
const _= require("lodash")
const router = express.Router();

// Yesterday Problem 4 Solution
router.get('/lodash', function(req,res){
    const month = ["January",'February','March','April','May','Jun','July','August','September','October','November','December']
    const getMonth = _.chunk(month,4)
    console.log(getMonth)

    const oddNum = [1,3,5,7,9,11,13,15,17,19]
    const newArray = _.tail(oddNum)
    console.log(newArray)

    const a= [1,2,3]
    const b = [2,3,4,5,6]
    const c = [6,4,7,8]
    const d = [8,7,9,12]
    const e = _.union(a,b,c,d)
    console.log(e)

    const arr =  [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    const arr1 = _.fromPairs(arr)
    console.log(arr1)

    res.send("Done!")
})

//02/06/2022 Solution-1
router.get('/movies', function(req,res){
    const movies = ["sholay","Pushpa","KGF","Housefull","Singham","Kabir Singh","Diljale","Dhamal"]
    res.send(movies)
})
// Solution-2
router.get('/movies/:indexNumber', function(req,res){
    const movies = ["sholay","Pushpa","KGF","Housefull","Singham","Kabir Singh","Diljale","Dhamal","RRR","DDL","Andaj"]
    let movieIndex = req.params.indexNumber
    //solution-3
    let finalMovies = " "
    if (movieIndex<movies.length){
        finalMovies=movies[movieIndex]
    }else{
        finalMovies = ("movies does not exits" + movies.length)
    }res.send(finalMovies)
})
//Solution-4
router.get('/films', function (req, res) {

    let arr = [ {
        id: 1,
        name: "The Shining",
       }, {
        id: 2,
        name: "Incendies",
       }, {
        id: 3,
        name: "Rang de Basanti",
       }, {
        id: 4,
        name: "Finding Nemo",
       }]

res.send(arr)

});

// // Problem No-5

router.get('/films/:filmId', function (req, res) {

    let arr = [ {
        id: 1,
        name: "The Shining",
       }, {
        id: 2,
        name: "Incendies",
       }, {
        id: 3,
        name: "Rang de Basanti",
       }, {
        id: 4,
        name: "Finding Nemo",
       }]
       
       filmIndex = req.params.filmId

       function idLookup (x) {
        return x.id ;
    }
    let getId = arr.map (idLookup)
    
       let finalFilm = " " 
    
       if ( filmIndex <= getId.length ) {
           finalFilm = arr[filmIndex-1]
       } else {
           finalFilm = ( "Please enter number equal to or below := " + getId.length + ", Because no movie exists with the entered id")
       }

res.send(finalFilm)
    })
    // solution of Pritesh Sir Assignment
    router.get('/sol1', function(req,res){
        const array =  [1,2,3,5,6,7]
       const count = array[array.length-1]
       const missingNumber=[];
       for(let i = 1; i<=count; i++)
       if(array.indexOf(i)== -1){
           missingNumber.push(i)
       }res.send(missingNumber.toString())

    })
    router.get('/sol2', function(req,res){
        const array2 =  [33, 34, 35, 37, 38]
        const count = array2[array2.length-1]
        const missingNumber = [];
        for(let i =33; i<=count; i++){
            if(array2.indexOf(i) == -1){
                missingNumber.push(i)
            }
        }res.send(missingNumber.toString())
    })

module.exports = router;
// adding this comment for no reason