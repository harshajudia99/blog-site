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

app.get('/getauthor', async(req,res) =>{
  const data = await Author.find();
    res.json(data);
})

app.post('/createauthor', async (req,res) => {
    let author = new Author(req.body);
    let result = await author.save();
    res.send(result);
})

app.delete('/deleteauthor/:id', async(req,res)=>{
  let result = await Author.deleteOne({_id: req.params.id});
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

