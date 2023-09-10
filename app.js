const express = require('express')
const {connectToDb, getDb} = require('./db')
//init app and middleware
const app = express()
//db variable to store connection
let db
//db connection
connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>{
            console.log('app listening on port 3000')
        })
    }
    db = getDb()
})

// app.listen(3000,()=>{
//     console.log('app listening on port 3000')
// })

//routes
app.get('/books',(req,res)=>{
    res.json({mssg:"welcome to api"})
})