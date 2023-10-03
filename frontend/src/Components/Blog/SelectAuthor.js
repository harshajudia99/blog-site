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
          <Select
            name="author"
            value={name}
            onChange={handleChange}
            placeholder="Select an author"
            className="select-author-field"
          >
            {authorData.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.fname} {item?.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <p>Selected Author: {fullName}</p>
      {
        fullName !== '' && (
          <AddBlog fullName={fullName} />
        )
      }
      <GetBlog fullName={fullName} />
    </div>
  );
};
