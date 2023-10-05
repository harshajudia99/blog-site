import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectUser({ setSelectedUser }) {
  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
    setSelectedUser(event.target.value); 
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select user</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Select user"
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="author">Author</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <p>Selected Author: {user}</p>
    </div>
  );
}
