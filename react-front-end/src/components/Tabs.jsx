import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material/";
import { Link } from "react-router-dom";

export default function NavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', align: 'center' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs" centered>
        <Tab label="Profile" component={Link} to={"/profile"} />
        <Tab label="My Listings" component={Link} to={"/mylistings"} />
        <Tab label="My Bookings" component={Link} to={"/mybookings"} />
      </Tabs>
    </Box>
  );
}
