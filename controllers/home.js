module.exports = {
  getIndex: async (req,res)=> {
    try {
      
      //add model
      foodCollection.find().toArray()
        .then(results => {
          res.render('index.ejs', {meals: results})
        })
        .catch(error => console.error(error))
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  }
}