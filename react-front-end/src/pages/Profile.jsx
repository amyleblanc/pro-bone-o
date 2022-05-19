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
  Typography,
} from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PetsIcon from '@mui/icons-material/Pets';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import userState from "../components/atoms";

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
        item xs={12} sm={10} md={10}
        sx={{
          display: "flex", 
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            minWidth: 200,
            bgcolor: "#ffde5a",
            boxShadow: 2,
            borderRadius: "16px",
            p: 2,
          }}
        >
          <Grid 
            item xs={12} sm={12} md={12}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Grid
              item xs={9} sm={8} md={6}
              sx={{ display: "flex" }}
            >
              <CardContent sx={{ width: "auto", paddingRight: 0 }}>
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
            </Grid>
            <Grid
              item xs={3} sm={2} md={10}
              sx={{ display: "flex", flexDirection: "row-reverse"  }}
            >
              <Avatar
                src={user.photo_url}
                alt="user avatar"
                sx={{ width: "auto", height: 0.5, margin: 1, boxShadow: 3 }}
              />
            </Grid>

          </Grid>
          <Box>
            <CardContent sx={{pt: 0}}>
              <Typography gutterBottom variant="h5" component="div" pb="10px">
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
                        sx={{ width: 70, height: 70, boxShadow: 3 }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ p: "20px", pb: 0 }}
                      >
                        {pet.name}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2.5, pb: 0, pt: "17px" }}>
                      <Tooltip title="Add Pet">
                        <IconButton aria-label="add pet">
                          <AddCircleIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
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
                endIcon={<PetsIcon />}
                sx={{ borderRadius: "16px", width: "100px", bgcolor: "#00A8A8" }}
              >
                Edit
              </Button>
            </CardActions>
          </Box>
        </Card>
        </Grid>
      </Grid>
    </div>
  );
}
