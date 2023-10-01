const express = require("express");
require("./db/config");
const cors = require("cors");
const Author = require("./db/Author");
const multer = require('multer');

const app = express()
app.use(express.json());
app.use(cors()); 

const port = 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/createauthor', upload.single('file'), async (req, res) => {
  console.log(req)
  try {
    let author = new Author({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      mobile: req.body.mobile,
      image: req.file.filename,
    });

    let result = await author.save();
    
    res.status(201).json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

app.put('/updateauthor/:id', upload.single('file'), async (req, resp) => {
  try {

    const updateFields = {};

    if (req.file) {
      updateFields.image = req.file.filename;
    }
    if (req.body.fname) {
      updateFields.fname = req.body.fname;
    }
    if (req.body.lname) {
      updateFields.lname = req.body.lname;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.mobile) {
      updateFields.mobile = req.body.mobile;
    }

    const result = await Author.updateOne(
      { _id: req.params.id },
      {
        $set: updateFields,
      }
    );

    resp.send(result);
  } catch (error) {
    resp.status(500).send('Error updating author with image and other fields');
  }
});

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/getauthor', async(req,res) =>{
  const data = await Author.find();
    res.json(data);
})

app.delete('/deleteauthor/:id', async(req,res)=>{
  let result = await Author.deleteOne({_id: req.params.id});
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

