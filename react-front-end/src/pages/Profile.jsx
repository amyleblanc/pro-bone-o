import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography, Container } from "@mui/material/";
import NavTabs from "../components/Tabs";

const axios = require("axios").default;


export default function Profile() {
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    const user = async () => {
      const res = await axios("/api/users/2");
      setUser(res.data);
    };
    user();
    console.log("user-profile", user);
  }, []);

  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Typography
          paddingBottom="40px"
          variant="h3"
          align="center"
          color="textSecondary"
        >
          My Account
        </Typography>
        
        <Card align="center">
          <NavTabs />
        </Card>
        
        <Card
          sx={{
            display: "flex",
            flexDirection: 'column',
            maxWidth: 552,
            minWidth: 200,
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 0.5,
            p: 2,
            mt: 5,
          }}
          >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Avatar
              src={user.photo_url}
              alt="user avatar"
              sx={{ width: 150, height: 150 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{paddingLeft: 5}}>
                {user.first_name} {user.last_name}
              </Typography>
              <Typography gutterBottom variant="p" component="div" sx={{paddingLeft: 5}}>
                email: {user.email_address}
              </Typography>
              <Typography gutterBottom variant="p" component="div" sx={{paddingLeft: 5}}>
                phone: {user.phone_number}
              </Typography>
              <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft: 5, paddingTop: 3}}>
                My Furry Friends:
              </Typography>
            </CardContent>
          </Box>
          <CardActions sx={{width: 200}}>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
