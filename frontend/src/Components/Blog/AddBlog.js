import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@mui/system/styled';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialFormData = {
  title: '',
  description: ''
}

export default function AddBlog({ fullName }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = React.useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function renderImage() {
    if (image instanceof File) {
      // If authorData.Image is a File object, create a temporary URL
      return <img className="postImage" alt="ima" src={URL.createObjectURL(image)} />;
    } else {
      // If authorData.Image is a URL, use it directly
      return <img className="postImage" alt="ima" src={`http://localhost:5500/backend/uploads/${image}`} />;
    }
  }


  const addBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', fullName);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('status', checked);
    data.append('file', image);

    let result = await fetch('http://localhost:3000/addblog', {
      method: "POST",
      header: {
        'content-type': 'multipart/form-data'
      },
      body: data
    });

    result = await result.json();
    console.log(result);

    handleClose();
    setFormData(initialFormData);
    window.location.reload(true);
  }


  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add Blog</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="add-blog-dialog">
            Add Blog
          </Typography>
          <form onSubmit={addBlog} enctype="multipart/form-data">
            <TextField
              name="name"
              label="Name"
              variant="standard"
              value={fullName}
              readOnly
              className="add-blog-inputfield"
            />
            <TextField
              name="title"
              label="Title"
              variant="standard"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="add-blog-inputfield"
            />
            <TextField
              name="description"
              label="Description"
              variant="standard"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="add-blog-inputfield"
            />

            <FormControlLabel
              className="add-blog-switch"
              label="Status"
              control={<Switch checked={checked} onChange={handleChange} />}
            /><br /><br />

            <Typography id="modal-modal-title" variant="h6" component="h2">
              {image ? renderImage() : "Upload image"}
            </Typography>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleImage}
                name="image"
              />
            </Button>
            <br />
            <br />
            <Button type="submit" variant="contained">
              Save blog
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
