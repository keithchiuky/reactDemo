const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const db = require('../conn')

//Middleware to print execution timestamp
router.use((req, res, next)=>{
    console.log('Time: '+ new Date(Date.now()))
    console.log('Searching in movies.')
    next()
})

//Express route to search movie by searching keyword
router.get('/search_result/:word', async (req,res)=>{
    
    let db_connect = db.getDB()
    let searchWord = req.params.word
    console.log(`Searching movies with keywords: ${searchWord}`)
    //Use text indexes to search in database for movie
    let result = await db_connect.collection('180659226_movies')
    .find({"$text":{"$search": `${searchWord}`}}).toArray()
    res.json(result)

})

//Route to search all movies in db
router.get('/movie', async (req,res)=>{
    let db_connect = db.getDB()
    console.log(`Find all movies in the database`)
    let result = await db_connect.collection('180659226_movies')
    .find({},{name:1, description:1, img:1}).toArray() 
    res.json(result)
})

//Route to search one specific movie by its id
router.get('/movie/:movie_id', async (req,res)=>{
    let db_connect = db.getDB()
    let findCrit = {_id: ObjectId(req.params.movie_id)}
    console.log(`Searching for specific movie`)
    let result = await db_connect.collection("180659226_movies").findOne(findCrit)
    res.json(result)
})


module.exports = router