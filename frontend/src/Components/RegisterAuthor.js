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

export default function RegisterAuthor() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = React.useState({
        fname:'',
        lname:'',
        email:'',
        mobile:''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };    

    const addAuthor = async () => {
        const requestData = {
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            mobile: formData.mobile,
        };
    
        let result = await fetch('http://localhost:3000/createauthor', {
            method: "POST",
            body: JSON.stringify(requestData), 
            headers: {
                "Content-Type": "application/json",
            }
        });
    
        result = await result.json();
        console.log(result);
    }
    

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Register Author
                    </Typography>
                    <form onSubmit={addAuthor}>
                        <TextField
                            name='fname'
                            label="First name"
                            variant="standard"
                            value={formData.fname}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            name='lname'
                            label="Last name"
                            variant="standard"
                            value={formData.lname}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            name='email'
                            label="Email"
                            variant="standard"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            name='mobile'
                            label="Mobile no."
                            variant="standard"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                        />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <br /><br />
                        <Button type="submit" variant="contained">Save author</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}