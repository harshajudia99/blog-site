import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Switch from '@mui/material/Switch';
import styled from "@mui/system/styled";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams, useNavigate } from "react-router-dom";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
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
  authorId:"",
  name: "",
  title: "",
  description: "",
};

export const UpdateBlog = () => {
  const [open, setOpen] = useState(true);
  const [updateFormData, setUpdateFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    console.log(params.id);
    let result = await fetch(`http://localhost:3000/getblogdata/${params.id}`);
    result = await result.json();
    setUpdateFormData(result);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const updateBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("authorId", updateFormData.authorId);
    data.append("name", updateFormData.name);
    data.append("title", updateFormData.title);
    data.append("description", updateFormData.description);
    data.append("status", checked);
    data.append("file", image);

    let result = await fetch(
      `http://localhost:3000/updateblog/${params.id}`,
      {
        method: "PUT",
        header: {
          "content-type": "multipart/form-data",
        },
        body: data,
      }
    );
    result = await result.json();
    navigate("/admin/addblog");
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="update-blog-dialog">
            Update Blog
          </Typography>
          <form onSubmit={updateBlog} enctype="multipart/form-data">
          <TextField
              name="authorId"
              label="Author Id"
              variant="standard"
              value={updateFormData.authorId}
              readOnly
              className="update-blog-inputfield"
            />
            <TextField
              name="name"
              label="Name"
              variant="standard"
              value={updateFormData.name}
              readOnly
              className="update-blog-inputfield"
            />
            <TextField
              name="title"
              label="Title"
              variant="standard"
              value={updateFormData.title}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />
            <TextField
              name="description"
              label="Description"
              variant="standard"
              value={updateFormData.description}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />

            <FormControlLabel
              label="Switch"
              control={<Switch checked={checked} onChange={handleChange} />}
            /><br /><br />

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
              Update blog
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
