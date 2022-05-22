import React from "react";
import { useRecoilValue } from "recoil";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material/";
import PetsIcon from "@mui/icons-material/Pets";
import userState from "../components/atoms";
import PetRegisterModal from "../components/register-modal";
import CreateListingModal from "../components/listing-modal";

export default function Profile() {
  const user = useRecoilValue(userState);

  const phoneNumber = user.phone_number.split("");
  phoneNumber.splice(3, 0, "-");
  phoneNumber.splice(7, 0, "-");

  return (
    <div>
      <Grid
        item
        container
        direction="row"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              bgcolor: "#ffde5a",
              boxShadow: 2,
              borderRadius: "16px",
              p: 2,
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}            >
              <Avatar
                src={user.photo_url}
                alt="user avatar"
                sx={{ width: "auto", height: 0.9, margin: 1, boxShadow: 3 }}
                />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Grid item xs={10} sm={9} md={12} sx={{ display: "flex" }}>
                <CardContent sx={{ width: "320px", paddingRight: 0 }}>
                  <Typography gutterBottom variant="h5" component="div">
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
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row", width: "300px"}}>
              <CardContent sx={{ pt: 0, pb: 0 }}>
                <Typography gutterBottom variant="h5" component="div" pb="10px">
                  My Furry Friends:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>

                {user.pets.map((pet) => (
                  <>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "50%", marginBottom: 2}}>
                      <Box>
                        <Avatar
                          key={pet.id}
                          src={pet.photo_url}
                          alt="pet avatar"
                          sx={{ width: 50, height: 50, boxShadow: 3 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          gutterBottom
                          variant="h7"
                          component="div"
                          sx={{ p: "15px", pb: 0 }}
                        >
                          {pet.name}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ))}
                </Box>
              </CardContent>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CardActions>
                <PetRegisterModal />
                <Tooltip title="Edit Profile">
                  <Button
                    variant="contained"
                    endIcon={<PetsIcon />}
                    sx={{
                      borderRadius: "16px",
                      width: "100px",
                      bgcolor: "#00A8A8",
                    }}
                  >
                    Edit
                  </Button>
                </Tooltip>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
