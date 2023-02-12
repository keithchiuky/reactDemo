const express = require('express')
const app = express()
const cors = require('cors')
const dbConn = require('./conn')
const movieRouter = require('./routes/movies')
const userRouter = require('./routes/users')
const ratingRouter = require('./routes/ratings')

app.use(express.json())
app.use(cors())

//Using routes defined in routers from movies.js, ratings.js and users.js
app.use(movieRouter)
app.use(userRouter)
app.use(ratingRouter)



app.listen(3000, ()=>{
    dbConn.connectServer((err)=>{
        if(err)
            console.error(err)
    })
    console.log("Server is running on port 3000")
})