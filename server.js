console.log('Uhhhh Hellooo??')

const express = require('express')
const app = express()
app.use(express.static('public'))
require('dotenv').config()

let db,
    dbConnectionStr = DB_STRING,
    dbName = 'dinner'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/', (req, res) => {
  res.send(__dirname + './public/index.html')
})



app.listen(3000, () => {
  console.log('listening on 3000')
})