import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function AuthorList({ open, setOpen }) {

    const [authorData, setAuthorData] = useState([]);

    useEffect(() => {
        getAuthors();
    }, [open]);

    const getAuthors = async () => {
        let result = await fetch('http://localhost:3000/getauthor');
        result = await result.json();
        setAuthorData(result);
    };

    const deleteAuthor = async (id, title) => {
        const confirmation = window.confirm(`Are you sure you want to delete author ${title} ?`);
    if(confirmation){
        let result = await fetch(`http://localhost:3000/deleteauthor/${id}`, {
            method: 'DELETE',
        });
        result = await result.json();
        if (result) {
            getAuthors();
        }
    }
    };

    return (
        <TableContainer component={Paper}>
            {authorData.length === 0 ? (
                <div>No author found!</div>
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Mobile no.</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authorData.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.fname}
                                </TableCell>
                                <TableCell align="right">{row.lname}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.mobile}</TableCell>
                                <TableCell align="right"><img src={`http://localhost:5500/backend/uploads/${row.image}`} alt="Author Image" className='author-image'/></TableCell>
                                <Button type="submit" size="small">
                                    <Link className="update-btn-link" to={`/updateauthor/${row._id}`}>Update Author</Link>
                                </Button>
                                <DeleteOutlineIcon onClick={() => deleteAuthor(row._id, row.fname)} className='del-btn' />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}
