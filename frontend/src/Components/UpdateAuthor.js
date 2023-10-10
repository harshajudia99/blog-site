import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@mui/system/styled";
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
  fname: "",
  lname: "",
  email: "",
  mobile: "",
};

const UpdateAuthor = () => {

  const [open, setOpen] = useState(true);
  const [updateFormData, setUpdateFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    console.log(params.id);
    let result = await fetch(`http://localhost:3000/get/${params.id}`);
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

const handleImage = (e) =>{
  setImage(e.target.files[0])
}

  const updateAuthor = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fname", updateFormData.fname);
    data.append("lname", updateFormData.lname);
    data.append("email", updateFormData.email);
    data.append("mobile", updateFormData.mobile);
    data.append("file", image);

    let result = await fetch(
      `http://localhost:3000/updateauthor/${params.id}`,
      {
        method: "PUT",
        header: {
          "content-type": "multipart/form-data",
        },
        body: data,
      }
    );
    result = await result.json();
    navigate("/admin/addauthor");
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
          <Typography id="modal-modal-title" variant="h6" component="h2" className="update-author-dialog">
            Update Author
          </Typography>
          <form onSubmit={updateAuthor} enctype="multipart/form-data">
            <TextField
              name="fname"
              label="First name"
              variant="standard"
              value={updateFormData.fname}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />
            <TextField
              name="lname"
              label="Last name"
              variant="standard"
              value={updateFormData.lname}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />
            <TextField
              name="email"
              label="Email"
              variant="standard"
              value={updateFormData.email}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />
            <TextField
              name="mobile"
              label="Mobile no."
              variant="standard"
              value={updateFormData.mobile}
              onChange={handleInputChange}
              required
              className="update-blog-inputfield"
            />
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
              Update author
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateAuthor;
