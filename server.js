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
  })

  app.delete('/deleteMeals/:name', async (req, res) => {
    try {
      const name = req.params.name.toLowerCase();
      
      const result = await foodCollection.aggregate([
        { $match: { $expr: { $eq: [{ $toLower: '$name' }, name] } } },
        { $limit: 1 }
      ]).toArray();
  
      if (result.length > 0) {
        const foodToDelete = result[0];
        const deleteResult = await foodCollection.deleteOne({ _id: foodToDelete._id });
  
        if (deleteResult.deletedCount > 0) {
          res.status(200).send('Food deleted successfully.');
        } else {
          res.status(500).send('Error deleting the food.');
        }
      } else {
        res.status(404).send('Food not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error deleting the food.');
    }
  });
  

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})