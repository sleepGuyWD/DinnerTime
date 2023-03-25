const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const mime = require('mime');

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'DinnerTime'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

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

app.get('/',  async  (req, res) => {
  try {
    res.render('index.ejs')
  } catch (error) {
    res.status(500).send({message: error.message})
  }
})

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})