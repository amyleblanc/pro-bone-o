import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography, Container } from "@mui/material/";
import userState from "../components/atoms";
import NavTabs from "../components/Tabs";

export default function Profile() {
  const user = useRecoilValue(userState);

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
              sx={{ width: 150, height: 150, marginRight: 5 }}
            />
            <CardContent sx={{width: 350}}>
              <Typography gutterBottom variant="h4" component="div">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                email: {user.email_address}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                phone: {user.phone_number}
              </Typography>
              <Typography gutterBottom variant="h5" component="div" sx={{paddingTop: 3, paddingBottom: 2}}>
                My Furry Friends:
              </Typography>
              {user.pets.map(pet => (
                <>
                  <Avatar
                    src={pet.photo_url}
                    alt="pet avatar"
                    sx={{ width: 70, height: 70 }}
                    />
                  <Typography gutterBottom variant="p" component="div" sx={{paddingTop: 1, paddingLeft: 2.5}}>
                    {pet.name}
                  </Typography>
                </>
                )
              )}
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
