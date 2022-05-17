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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import userState from "../components/atoms";

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
        }}
      >
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
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Avatar
              src={user.photo_url}
              alt="user avatar"
              sx={{ width: 150, height: 150, margin: 3 }}
            />
            <CardContent sx={{ width: 350 }}>
              <Typography gutterBottom variant="h4" component="div">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                <b>email: </b> {user.email_address}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                <b>phone: </b>
                {phoneNumber}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                My Furry Friends:
              </Typography>
              {user.pets.map((pet) => (
                <>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                      <Avatar
                        key={pet.id}
                        src={pet.photo_url}
                        alt="pet avatar"
                        sx={{ width: 70, height: 70 }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ p: 2 }}
                      >
                        {pet.name}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <AddCircleOutlineIcon size="large" />
                    </Box>
                  </Box>
                </>
              ))}
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "16px", width: "100px" }}
              >
                Edit
              </Button>
            </CardActions>
          </Box>
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
          <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
        </Card>
      </Container>
    </div>
  );
}
