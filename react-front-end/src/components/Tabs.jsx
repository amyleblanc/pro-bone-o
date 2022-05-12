import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material/";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', align: 'center' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
        <LinkTab label="Profile" href="/users/profile" />
        <LinkTab label="My Listings" href="/users/listings/:id" />
        <LinkTab label="My Bookings" href="/users/bookings/:id" />
      </Tabs>
    </Box>
  );
}
