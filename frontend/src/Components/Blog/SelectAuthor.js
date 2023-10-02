import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddBlog from "./AddBlog";
import { GetBlog } from "./GetBlog";

export const SelectAuthor = () => {
  const [name, setName] = useState("");
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    getAuthors();
  }, []);

  useEffect(() => {
    if (authorData.length > 0) {
      setName(authorData[0]._id);
    }
  }, [authorData]);

  const handleChange = (event) => {
    const selectedName = event.target.value;
    setName(selectedName);

    const selectedStudent = authorData.find((item) => item._id === selectedName);
    if (selectedStudent) {
      setFullName(`${selectedStudent.fname} ${selectedStudent.lname}`);
    }
  };

  const getAuthors = async () => {
    try {
      let result = await fetch("http://localhost:3000/getauthor");
      result = await result.json();
      setAuthorData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select an author</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Select an author"
            onChange={handleChange}
          >
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              authorData.map((result) => (
                <MenuItem key={result._id} value={result._id}>
                  {result?.fname} {result?.lname}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>
      <p>Selected Author: {fullName}</p>
      <AddBlog fullName={fullName}/>
      <GetBlog fullName={fullName}/>
    </div>
  );
};
