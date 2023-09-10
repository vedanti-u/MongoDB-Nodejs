const express = require('express')
const {connectToDb, getDb} = require('./db')
//init app and middleware
const app = express()
app.use(express.json())
  
const {MongoClient,ObjectId} = require('mongodb')

let db;
MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
.then((client)=>{
    console.log("Client",client)
    db = client.db()
})
.catch((err)=>{
    console.log(err)
})

//routes
app.get('/books',(req,res)=>{
    //array to store book
    let books = []
    console.log("before query")
    console.log(db)
    //this is db.books
    db.collection('books')
    .find() 
    .forEach(book =>{
        console.log(book)
        books.push(book)
    })
    .then(()=>{
        console.log("trying to print")
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error:'Could not fetch docu'})
    })
})

app.get('/books/:id',(req,res)=>{
    //req.params.id
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc =>{
            res.status(200).json(doc)
        })
        .catch(err =>{
            res.status(500).json({error:'Bye'})
        })
    }
    else{
        res.status(500).json({error:'not valid id bro'})
    }
})

app.post('/books',(req,res)=>{
  const book = req.body

  db.collection('books')
  .insertOne(book)
  .then(result=>{
    res.status(201).json(result)
  })
  .catch(err=>{
    res.status(500).json({err:"can't add bro"})
  })

})
app.listen(3000)