const express = require('express')
const app = express()
const cors = require('cors')
const mime = require('mime');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Dinner',
    foodCollection   

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
    foodCollection = db.collection('DinnerTime')

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cors())
    
    app.use(express.static('public', {
      setHeaders: (res, path, stat) => {
        res.set('Content-Type', mime.getType(path));
      }
    }));
    
    app.get('/', async (req, res) => {
      try {
        foodCollection.find().toArray()
          .then(results => {
            res.render('index.ejs', {meals: results})
          })
          .catch(error => console.error(error))
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    })    

    app.get('/random-document', async (req, res) => {
      try {
        
        foodCollection.find().toArray()
          .then(results => {
            console.log(results)
            res.json(results)
          })
          .catch(error => console.error(error))
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    });
    
    app.post('/meals', (req, res) => {
      foodCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  
    app.delete('/deleteMeal',  (req, res) => {
        foodCollection.deleteOne({mealName: req.body.name})
          .then(result => {
            console.log('Meal Deleted')
            res.json('Meal Deleted')
          })
          .catch(error => console.error(error))
    });
  }) 

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})