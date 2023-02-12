const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const db = require('../conn')

router.use((req, res, next)=>{
    console.log('Time: '+ new Date(Date.now()))
    console.log('Searching in users.')
    next()
})

//Route to login authentication for login user
router.use('/login', async (req,res)=>{
    let db_connect = db.getDB()
    let User = req.body.username
    let Password = req.body.password

    
    let result = await db_connect.collection('180659226_users')
    .findOne({username: User})

    if(result){
        if(result.password === Password){   
            res.send({
                token:result._id,
                message: "Log in successfully!"
            })

            console.log("Authentication success!")
        } else{
          res.send({message: "Incorrect username/password!" })  
        }
        
    }
    
     else{
        res.send({message: "Incorrect username/password!"})
    }

    
})

//Searching the specific movie whether it is in favourite or not
router.use('/myfav', async(req,res)=>{
    let db_connect = db.getDB()
  let matchMovie = ObjectId(req.body.movie)
  let matchUser = req.body.user
  let matchCrit = {movie_id : matchMovie, user: `${matchUser}`}
  let result = await db_connect.collection('180659226_fav')
  .findOne(matchCrit)

  res.json(result)
})

//Searching user's all movies in favourite list
router.use('/myfavlist', async(req,res)=>{
    let db_connect = db.getDB()
    let user = req.body.user
    let movie_list=[]
    console.log(`Searching user ${user}'s list `)

    let result = await db_connect.collection('180659226_fav')
    .aggregate([
        {
            '$lookup': {
                'from': '180659226_movies', 
                'localField': 'movie_id', 
                'foreignField': '_id', 
                'as': 'movie'
            }
        }, {
            '$match': {
                'user': `${user}`
            }
        }
    ])

    if(result){
        for await (const doc of result){
            movie_list.push(doc.movie)
            console.log(movie_list)
        }

        res.json(movie_list)
    }

    



})

//Update the movie favourite status
router.use('/updatefav', async(req,res)=>{
    let db_connect = db.getDB()
  let newRating = req.body.rating
  let matchMovie = ObjectId(req.body.movie)
  let matchUser = req.body.user
  let matchCrit = {movie_id : matchMovie, user:`${matchUser}`}

  let result = await db_connect.collection('180659226_fav')
  .findOne(matchCrit)

  if(result === null){
    result = await db_connect.collection('180659226_fav')
    .insertOne({
      movie_id: matchMovie,
      user: `${matchUser}`,
      isFav: newRating
    })

    if(result){
      res.send({message: "You added the movie to your favourite"})
    }

  } else{
    result = await db_connect.collection('180659226_fav')
    .updateOne({movie_id: matchMovie, user: `${matchUser}`},
    {$set:{"isFav": newRating}})
    res.send({message: "You added the movie to your favourite"})
  }

  
})


module.exports = router