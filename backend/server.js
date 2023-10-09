const express = require("express");
require("./db/config");
const cors = require("cors");
const Author = require("./db/Author");
const Blog = require("./db/Blog");
const User = require("./db/User");
const AdminUser = require("./db/AdminUser");
const bcrypt = require('bcrypt');
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


app.get('/get/:id', async (req, res) => {
  let result = await Author.findOne({ _id: req.params.id })
  res.send(result);
})

app.get('/getauthor', async (req, res) => {
  const data = await Author.find();
  res.json(data);
})

app.delete('/deleteauthor/:id', async (req, res) => {
  let result = await Author.deleteOne({ _id: req.params.id });
  res.send(result);
})

app.post('/addblog', upload.single('file'), async (req, res) => {
  try {
    let author = new Blog({
      authorId: req.body.authorId,
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      status: req.body.status,
      likes: 0
    });

    let result = await author.save();

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/getblog', async (req, res) => {
  const data = await Blog.find();
  res.json(data);
})


app.put('/updateblog/:id', upload.single('file'), async (req, resp) => {
  try {

    const updateFields = {};

    if (req.file) {
      updateFields.image = req.file.filename;
    }
    if (req.body.authorId) {
      updateFields.authorId = req.body.authorId;
    }
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.title) {
      updateFields.title = req.body.title;
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }
    if (req.body.status !== undefined) {
      updateFields.status = req.body.status;
    }
    if (req.body.likes) {
      updateFields.likes = req.body.likes;
    }

    const result = await Blog.updateOne(
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


app.post('/insertcomment/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { comments: { authorName: req.body.authorName, comment: req.body.comment } },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ Message: 'Blog not found' });
    }

    return res.status(201).json({ Message: 'Comment added successfully', updatedBlog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Message: 'Error inside server' });
  }
});

app.get('/getblogdata/:id', async (req, res) => {
  let result = await Blog.findOne({ _id: req.params.id })
  res.send(result);
})

app.delete('/deleteblog/:id', async (req, res) => {
  let result = await Blog.deleteOne({ _id: req.params.id });
  res.send(result);
})

app.post('/author/signup', async (req, res) => {
  const { fname,
    lname,
    email,
    mobile,
    password,
    cpassword } = req.body;

    if(!fname || !lname || !email || !mobile || !password || !cpassword){
      return res.status(400).send("All fields are required");
    }

    try{
      const userExist=await User.findOne({email: email});

      if(userExist){
        return 	res.status(409).send('Email already exist');
      }else if(password !== cpassword){
        return 	res.status(409).send('Password not matching');
      }else{
        const user = new User({fname, lname, email, mobile, password, cpassword});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
      }

    }catch(err){
      console.log(err)
    }
});

app.post('/author/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ "message": "Please enter all fields" });
    }

    const userLogin = await User.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (userLogin) {
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" })
      } else {
        res.json(userLogin);
      }
    } else{
      res.status(400).json({ error: "Invalid credentials" })
    }

  } catch (err) {
    console.log(err);
  }
});

app.post('/admin/signup', async (req, res) => {
  const { fname,
    lname,
    email,
    mobile,
    password,
    cpassword } = req.body;

    if(!fname || !lname || !email || !mobile || !password || !cpassword){
      return res.status(400).send("All fields are required");
    }

    try{
      const adminExist=await AdminUser.findOne({email: email});

      if(adminExist){
        return 	res.status(409).send('Email already exist');
      }else if(password !== cpassword){
        return 	res.status(409).send('Password not matching');
      }else{
        const admin = new AdminUser({fname, lname, email, mobile, password, cpassword});
        await admin.save();
        res.status(201).json({message: "Admin registered successfully"});
      }

    }catch(err){
      console.log(err)
    }
})

app.post('/admin/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ "message": "Please enter all fields" });
    }

    const adminLogin = await AdminUser.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, adminLogin.password);

    if (adminLogin) {
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" })
      } else {
        res.json(adminLogin);
      }
    } else{
      res.status(400).json({ error: "Invalid credentials" })
    }

  } catch (err) {
    console.log(err);
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

