import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router-dom";

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

export default function Comments() {
  const [open, setOpen] = React.useState(false);
  const [commentData, setCommentData] = useState({
    authorName: "",
    comment: "",
  });

  const params = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  const addComment = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/insertcomment/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((result) => {
        if (result.ok) {
          console.log('Comment added successfully');
        } else {
          console.error('Error:', result.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setOpen(false);
    window.location.reload(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="comment-btn">Add Comments...</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={addComment}>
            <TextField
              name="authorName"
              label="Author Name"
              variant="standard"
              value={commentData.authorName}
              onChange={handleInputChange}
              required
              className="comment-name-inputfield"
            />
            <TextField
              name="comment"
              label="Comment"
              variant="standard"
              value={commentData.comment}
              onChange={handleInputChange}
              required
              className="comment-text-inputfield"
            />
            <Button type="submit" variant="contained">
              Post comment
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
