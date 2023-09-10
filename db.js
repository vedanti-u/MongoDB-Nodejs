const {MongoClient} = require('mongodb')
//mongoclient helps to connect with mongo db
//one func to connect to db
//one func to retrieve/returnn the db connection once cconnected
let dbConnection

module.exports ={
    connectToDb:(cb)=>{
        MongoClient.connect('mongodb://localhost://27017/bookstore')
        .then((client)=>{
            dbConnection = client.db()
            return cb()
        })
        .catch((err)=>{
            console.log(err)
            return cb(err)
        })
    },
    getDb:()=>{dbConnection}
}
