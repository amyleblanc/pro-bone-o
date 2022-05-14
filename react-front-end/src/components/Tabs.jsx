import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material/";
import MyListings from "../pages/MyListings";
import Profile from "../pages/Profile";
import MyBookings from "../pages/MyBookings";
import { green } from '@mui/material/colors';

export default function NavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
    <Box sx={{ width: '100%', align: 'center' }}>
      <Tabs 
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
        centered
      >
        <Tab label="Profile"  />
        <Tab label="My Listings"  />
        <Tab label="My Bookings"  />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Profile />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <MyListings url={"/api/listing"} />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <MyBookings />
    </TabPanel>
    </>
  );
}

