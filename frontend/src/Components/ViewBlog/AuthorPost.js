import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const AuthorPost = ({ name, authorId }) => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    let result = await fetch("http://localhost:3000/getblog");
    result = await result.json();

    const filteredData = result.filter((post) => post.authorId === authorId);
    setBlogData(filteredData);
  };

  const handleSortAZ = () => {
    const sortedData = [...blogData].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setBlogData(sortedData);
  };

  const handleSortZA = () => {
    const sortedData = [...blogData].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setBlogData(sortedData);
  };

  return (
    <div className="author-blog-list">
      <h3 className="post-title">Posts</h3>

      <Button variant="contained" onClick={handleSortAZ} >Sort A -{">"} Z</Button>
      <Button variant="contained" onClick={handleSortZA} className="desc-sort-btn">Sort Z -{">"} A</Button>

      <TableContainer component={Paper}>
        {blogData.length === 0 ? (
          <div>No blogs yet!</div>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="center">Blog title</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={`http://localhost:5500/backend/uploads/${row.image}`}
                      alt="Blog Image"
                      className="author-image"
                    />
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">
                    {row.status ? "true" : "false"}
                  </TableCell>
                  <TableCell align="center">
                    {row.status ? (
                      <Button
                        type="submit"
                        size="small"
                        className="view-blog-btn"
                      >
                        <Link
                          className="update-btn-link"
                          to={`/viewblog/${row._id}`}
                        >
                          View Blog
                        </Link>
                      </Button>
                    ) : (
                      <span className="disabled-link">
                        View Blog (Disabled)
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};
