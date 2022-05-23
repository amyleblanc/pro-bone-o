import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material/";
import userState from "../components/atoms";
import axiosRequest from "../helper/axios";
import moment from "moment";
import ResponsiveBooking from "../components/modal-booking";

export default function MyBookings(props) {
  const [listings, setListings] = useState([]);
  const { url } = props;

  useEffect(() => {
    axiosRequest(url, "GET").then((res) => setListings(res));
  }, [url]);

  const user = useRecoilValue(userState);
  console.log("user info: ", user);
  console.log("listing info: ", listings);

  const bookings = user.booking;
  console.log("bookings: ", bookings);

  const filterBookings = (listings, bookings) => {
    const filtered = [];
    for (let listing of listings) {
      for (let booking of bookings) {
        if (booking.listing_id === listing.id && !listing.archived)
          filtered.push(listing);
      }
    }
    return filtered;
  };

  const filterArchivedBookings = (listings, bookings) => {
    const filtered = [];
    for (let listing of listings) {
      for (let booking of bookings) {
        if (
          booking.listing_id === listing.id &&
          (listing.archived || booking.archived)
        )
          filtered.push(listing);
      }
    }
    return filtered;
  };

  const userBookings = filterBookings(listings, bookings);
  console.log("userBookings Info: ", userBookings);

  const archivedBookings = filterArchivedBookings(listings, bookings);
  console.log("archivedBookings: ", archivedBookings);

  const userBookingsMapped = userBookings.map((booking) => {
    return (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Card
            sx={{
              bgcolor: "#ffde5a",
              boxShadow: 2,
              borderRadius: 3,
              maxWidth: 350,
              minWidth: 350,
              m: 1,
            }}
          >
            {booking.pets !== null && (
              <CardMedia
                component="img"
                height="320px"
                width="auto"
                image={booking.pets.photo_url}
                alt="Dog"
              />
            )}
            {booking.pets === null && (
              <Grid
                item
                container
                direction="row"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={booking.users.photo_url}
                  alt="user avatar"
                  sx={{
                    width: 0.6,
                    height: "auto",
                    marginTop: 5,
                    marginBottom: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            )}
            <Grid
              item
              container
              direction="row"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ width: 280 }}>
                <Typography variant="h6" gutterBottom>
                  {moment(booking.start_time).format("LL")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography align="center" gutterBottom>
                    {`${moment(booking.start_time).format("LT")} to ${moment(
                      booking.end_time
                    ).format("LT")}`}
                  </Typography>
                </Box>
                {booking.pets !== null && (
                  <Typography gutterBottom>
                    {`${
                      booking.activity_type.charAt(0).toUpperCase() +
                      booking.activity_type.slice(1)
                    } with ${booking.pets.name}`}
                  </Typography>
                )}
                {booking.pets === null && (
                  <Typography gutterBottom>
                    {`${
                      booking.activity_type.charAt(0).toUpperCase() +
                      booking.activity_type.slice(1)
                    } with ${booking.users.first_name}`}
                  </Typography>
                )}
                <Typography mt="20px">
                  <b>Status: </b>
                  {booking.accepted ? "Accepted" : "Pending"}
                </Typography>
              </CardContent>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardActions sx={{ width: 170, p: 0 }}>
                <ResponsiveBooking
                  booking_id={booking["booking"][0]["id"]}
                  first_name={booking.users.first_name}
                  last_name={booking.users.last_name}
                  profile_photo={booking.users.photo_url}
                  view={"Send Message"}
                />
              </CardActions>
              <CardActions sx={{ width: 170, paddingBottom: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "16px" }}
                >
                  Cancel Booking
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      </>
    );
  });

  const archiveBookingsMapped = archivedBookings.map((booking) => {
    return (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
          }}
        >
          <Card
            sx={{
              bgcolor: "#ffde5a",
              boxShadow: 2,
              borderRadius: 3,
              maxWidth: 350,
              minWidth: 350,
              m: 1,
            }}
          >
            {booking.pets !== null && (
              <CardMedia
                component="img"
                height="265px"
                width="auto"
                image={booking.pets.photo_url}
                alt="Dog"
              />
            )}
            {booking.pets === null && (
              <Grid
                item
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={booking.users.photo_url}
                  alt="user avatar"
                  sx={{
                    width: 0.6,
                    height: "auto",
                    marginTop: 5,
                    marginBottom: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            )}
            <Grid
              item
              container
              direction="row"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ width: 280 }}>
                <Typography variant="h6" gutterBottom>
                  {moment(booking.start_time).format("LL")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography align="center" gutterBottom>
                    {`${moment(booking.start_time).format("LT")} to ${moment(
                      booking.end_time
                    ).format("LT")}`}
                  </Typography>
                </Box>
                {booking.pets !== null && (
                  <Typography gutterBottom>
                    {`${
                      booking.activity_type.charAt(0).toUpperCase() +
                      booking.activity_type.slice(1)
                    } with ${booking.pets.name}`}
                  </Typography>
                )}
                {booking.pets === null && (
                  <Typography gutterBottom>
                    {`${
                      booking.activity_type.charAt(0).toUpperCase() +
                      booking.activity_type.slice(1)
                    } with ${booking.users.first_name}`}
                  </Typography>
                )}
                <Typography mt="20px">
                  <b>Status: </b> Archived
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </>
    );
  });

  return (
    <>
      {userBookings.length > 0 && (
        <Typography variant="h5" m="30px" align="center">
          Upcoming Bookings
        </Typography>
      )}
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        columnSpacing={{ xs: 1, sm: 2, md: 0.05 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        {userBookingsMapped}
      </Grid>
      {archivedBookings.length > 0 && (
        <Typography variant="h5" m="30px" align="center">
          Past/Archived Bookings
        </Typography>
      )}
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        columnSpacing={{ xs: 1, sm: 2, md: 0.05 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        {archiveBookingsMapped}
      </Grid>
    </>
  );
}
