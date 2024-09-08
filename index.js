const express = require("express")
const { MongoClient } = require("mongodb");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express()

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin&retryWrites=true&writeConcern=majority`
const client = new MongoClient(uri);



async function run() {
    try {
      const database = client.db('doctorsapp');
      const movies = database.collection('doctors');
      // Query for a movie that has the title 'Back to the Future'
      const query = { name: { $regex: /jane/i } };
      const movie = await movies.findOne(query);
      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.get("/", (req,res)=>{
    res.send("<h2>Sal00 mundo</h2>")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))