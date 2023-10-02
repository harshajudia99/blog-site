import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


export const GetBlog = ({ fullName }) => {

    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        let result = await fetch('http://localhost:3000/getblog');
        result = await result.json();
        setBlogData(result);
        console.log(result);
    };

    const deleteBlog = async (id, title) => {
        const confirmation = window.confirm(`Are you sure you want to delete the ${title} blog ?`);
        if (confirmation) {
            let result = await fetch(`http://localhost:3000/deleteblog/${id}`, {
                method: 'DELETE',
            });
            result = await result.json();
            if (result) {
                getBlog();
            }
        }
    };


    return (
        <TableContainer component={Paper}>
            {blogData.length === 0 ? (
                <div>No author found!</div>
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogData.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.status ? 'true' : 'false'}</TableCell>
                                <TableCell align="right"><img src={`http://localhost:5500/backend/uploads/${row.image}`} alt="Blog Image" className='blog-image' /></TableCell>
                                <Button type="submit" size="small">
                                    <Link className="update-btn-link" to={`/updateblog/${row._id}`}>Update Blog</Link>
                                </Button>
                                <DeleteOutlineIcon onClick={() => deleteBlog(row._id, row.title)} className='del-btn' />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    )
}
