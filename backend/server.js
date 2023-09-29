const express = require("express");
require("./db/config");
const cors = require("cors");
const Author = require("./db/Author");

const app = express()
app.use(express.json());
app.use(cors()); 

const port = 3000

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.post('/createauthor', async (req,res) => {
    let todo = new Author(req.body);
    let result = await todo.save();
    res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

