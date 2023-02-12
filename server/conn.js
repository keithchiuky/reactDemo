const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017/webAsgn'
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const assert  = require('assert')


var db

function connectServer () {
        client.connect(async (err, client)=>{
        assert.equal(err, null)
        console.log('Connected to server.')

        db = client.db("webAsgn")
        if (db){
            console.log('Connected to MongoDB.')
        }
    })
}

function getDB() {
    return db
}

module.exports = {connectServer, getDB}
