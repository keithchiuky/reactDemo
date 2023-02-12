const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const db = require('../conn')

//Middleware 
router.use((req, res, next)=>{
    console.log('Time: '+ new Date(Date.now()))
    console.log('Searching in ratings.')
    next()
})

//Route for aggregating average rating to specific movie
router.use('/avg_rating/:movie_id', async (req,res)=>{
    let db_connect = db.getDB()
    let matchCrit = ObjectId(req.params.movie_id)
    let docs = []
    console.log(`Searching overall average rating`)
    let result = 
    await db_connect.collection('180659226_ratings')
    .aggregate([
        
            {
              '$match': {
                'movie_id': matchCrit
              }
            }, {
              '$group': {
                '_id': '$movie_id', 
                'avgRating': {
                  '$avg': '$rating'
                }
              }
            }
          
      ])

    
    if(result){
        for await (const doc of result) {
            docs.push(doc) 
        }

        res.json(docs)
        
    }
    
})

//Route for searching specific user rating
router.use('/myrating', async (req,res)=>{
  let db_connect = db.getDB()
  let matchMovie = ObjectId(req.body.movie)
  let matchUser = req.body.user
  let matchCrit = {movie_id : matchMovie, user: `${matchUser}`}
  console.log('Searching for user rating')
  let result = await db_connect.collection('180659226_ratings')
  .findOne(matchCrit)

  console.log(result)
  res.json(result)
})

//Route for searching
router.use('/updatemyrating', async(req,res)=>{
  let db_connect = db.getDB()
  let newRating = req.body.rating
  let matchMovie = ObjectId(req.body.movie)
  let matchUser = req.body.user
  let matchCrit = {movie_id : matchMovie, user:`${matchUser}`}

  //Find any rating related to that movie from the user
  let result = await db_connect.collection('180659226_ratings')
  .findOne(matchCrit)

  //If user never rated the movie, create rating else update rating
  if(result === null){
    result = await db_connect.collection('180659226_ratings')
    .insertOne({
      movie_id: matchMovie,
      user: `${matchUser}`,
      rating: newRating
    })

    if(result){
      res.send({message: "Your rating is accepted!"})
    }

  } else{
    result = await db_connect.collection('180659226_ratings')
    .updateOne({movie_id: matchMovie, user: `${matchUser}`},
    {$set:{"rating": newRating}})
    res.send({message: "Your rating is updated!"})
  }

  console.log(result)

})

module.exports = router