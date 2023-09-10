const {MongoClient} = require('mongodb')
//mongoclient helps to connect with mongo db
//one func to connect to db
//one func to retrieve/returnn the db connection once cconnected
let dbConnection

module.exports ={
    connectToDb:(cb)=>{
       
    },
    getDb:()=>{dbConnection}
}
//mongodb://localhost:27017/