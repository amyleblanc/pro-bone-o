import React from "react";
import { useRecoilValue } from "recoil";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
} from "@mui/material/";
import userState from "../components/atoms";
import Chat from "../components/Chat";

export default function Profile() {
  const user = useRecoilValue(userState);

  const phoneNumber = user.phone_number.split("");
  phoneNumber.splice(3, 0, "-");
  phoneNumber.splice(7, 0, "-");

  return (
    <div>
      <Container
          sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "sm",
          bgcolor: "background.paper",
        }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            minWidth: 200,
            bgcolor: "#ffde5a",
            boxShadow: 1,
            borderRadius: "16px",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar
              src={user.photo_url}
              alt="user avatar"
              sx={{ width: 150, height: 150, marginRight: 5 }}
            />
            <CardContent sx={{ width: 350 }}>
              <Typography gutterBottom variant="h4" component="div">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                <b>email: </b> {user.email_address}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                <b>phone: </b>{phoneNumber}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ paddingTop: 3, paddingBottom: 2 }}
              >
                My Furry Friends:
              </Typography>
              {user.pets.map((pet) => (
                <>
                  <Avatar
                    key={pet.id}
                    src={pet.photo_url}
                    alt="pet avatar"
                    sx={{ width: 70, height: 70 }}
                  />
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    sx={{ paddingTop: 1 }}
                  >
                    {pet.name}
                  </Typography>
                </>
              ))}
            </CardContent>
          </Box>
          <CardActions>
            <Button variant="contained" color="success" sx={{borderRadius: '16px', width: '100px'}}>Edit</Button>
          </CardActions>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 552,
            minWidth: 200,
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 0.5,
            p: 2,
            mt: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Chat
              first_name={user.first_name}
              last_name={user.last_name}
              id={user.id} //just needs to be updated to booking.id in real booking
            ></Chat>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
