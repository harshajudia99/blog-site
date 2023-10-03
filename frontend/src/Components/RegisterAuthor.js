import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialFormData = {
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    image: ''
}

export default function RegisterAuthor({ open, setOpen }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [image, setImage] = React.useState(null)
    const [formData, setFormData] = React.useState(initialFormData)


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    function renderImage() {
        if (image instanceof File) {
            // If authorData.Image is a File object, create a temporary URL
            return <img className="add-author-img" alt="ima" src={URL.createObjectURL(image)} />;
        } else {
            // If authorData.Image is a URL, use it directly
            return <img className="add-author-img" alt="ima" src={`http://localhost:5500/backend/uploads/${image}`} />;
        }
    }

    const addAuthor = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fname', formData.fname);
        data.append('lname', formData.lname);
        data.append('email', formData.email);
        data.append('mobile', formData.mobile);
        data.append('file', image);

        let result = await fetch('http://localhost:3000/createauthor', {
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
    }


    return (
        <div>
            <Button onClick={handleOpen} variant='contained' className='add-author-btn'>add Author</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='add-author-dialog'>
                        Add Author
                    </Typography>
                    <form onSubmit={addAuthor} enctype='multipart/form-data'>
                        <TextField
                            name='fname'
                            label="First name"
                            variant="standard"
                            value={formData.fname}
                            onChange={handleInputChange}
                            required
                            className='add-author-inputfield'
                        />
                        <TextField
                            name='lname'
                            label="Last name"
                            variant="standard"
                            value={formData.lname}
                            onChange={handleInputChange}
                            required
                            className='add-author-inputfield'
                        />
                        <TextField
                            name='email'
                            label="Email"
                            variant="standard"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className='add-author-inputfield'
                        />
                        <TextField
                            name='mobile'
                            label="Mobile no."
                            variant="standard"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                            className='add-author-inputfield'
                        />
                        <Typography className="renderImage" id="modal-modal-title" variant="h6" component="h2">
                            {image ? renderImage() : "Upload image"}
                        </Typography>

                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleImage} name='image' />
                        </Button>
                        <br /><br />
                        <Button type="submit" variant="contained">Save author</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}