const express = require('express')
const {connectToDb, getDb} = require('./db')
//init app and middleware
const app = express()
app.use(express.json())
  
const {MongoClient,ObjectId} = require('mongodb')

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true
}))

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:'ddemruq3y',
  api_key:'584821523663682',
  api_secret:'vy0eTlXWPDWyML4aKFeChRQuBcA'
});

// Log the configuration
console.log('cloudimnary config',cloudinary.config());


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

// app.get('/books/:id',(req,res)=>{
//     //req.params.id
//     if(ObjectId.isValid(req.params.id)){
//         db.collection('books')
//         .findOne({_id: new ObjectId(req.params.id)})
//         .then(doc =>{
//             res.status(200).json(doc)
//         })
//         .catch(err =>{
//             res.status(500).json({error:'Bye'})
//         })
//     }
//     else{
//         res.status(500).json({error:'not valid id bro'})
//     }
// })

app.get('/books/:id',(req,res)=>{
    //req.params.id
        let ratedbook = []
        db.collection('books')
        .find({rating: req.params.id})
        .forEach(book=>{
            console.log(book)
            ratedbook.push(book)
        })
        .then(() =>{
            res.status(200).json(ratedbook)
        })
        .catch(err =>{
            res.status(500).json({error:'Nhi hai vo rating ke'})
        })
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
app.post('/',(req,res)=>{
    const file = req.files.photo;
    //const book = req.body
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        console.log("successfully uploaded")
        db.collection('books').insertOne({
            title:req.body.title,
            author:req.body.author,
            rating:req.body.rating,
            imageurl:result.url})
    })
    .then(result=>{
        console.log("added data to db")
        res.status(201).json(result)
      })
      .catch(err=>{
        res.status(500).json({err:"can't upload"})
      })
  })
app.listen(3000)