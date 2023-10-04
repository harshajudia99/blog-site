import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export const MostLiked = () => {
    const [likesData, setLikesData] = useState([]);

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        let result = await fetch('http://localhost:3000/getblog');
        result = await result.json();

        result.sort((a, b) => b.likes - a.likes);

        setLikesData(result);
    };

    return (
        <TableContainer component={Paper} className='admin-blog-list'>
            {likesData.length === 0 ? (
                <div>No result found!</div>
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Likes</TableCell>
                            <TableCell align="center">View Blog</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {likesData.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.likes}</TableCell>
                                <TableCell align="right" className='blog-list-edit'>
                                    <Button type="submit" size="small">
                                        <Link className="update-btn-link" to={`/viewblog/${row._id}`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};
