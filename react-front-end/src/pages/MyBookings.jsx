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
  Container,
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
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 552,
            minWidth: 200,
            bgcolor: "#ffde5a",
            boxShadow: 3,
            borderRadius: "16px",
            p: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Box sx={{ display: "flex", mt: "20px" }}>
              {booking.pets !== null && (
                <Avatar
                  src={booking.pets.photo_url}
                  alt="pet avatar"
                  sx={{
                    width: 120,
                    height: 120,
                    marginRight: 5,
                    boxShadow: 3,
                  }}
                />
              )}
              {booking.pets === null && (
                <Avatar
                  src={booking.users.photo_url}
                  alt="pet avatar"
                  sx={{
                    width: 120,
                    height: 120,
                    marginRight: 5,
                    boxShadow: 3,
                  }}
                />
              )}
            </Box>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActions sx={{ width: 170, p: 0 }}>
                <ResponsiveBooking
                  booking_id={booking["booking"][0]["id"]}
                  first_name={booking.users.first_name}
                  last_name={booking.users.last_name}
                  profile_photo={booking.users.photo_url}
                />
              </CardActions>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActions sx={{ width: 170 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "16px" }}
                >
                  Cancel Booking
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Card>
      </>
    );
  });

  const archiveBookingsMapped = archivedBookings.map((booking) => {
    return (
      <>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 552,
            minWidth: 200,
            bgcolor: "#ffde5a",
            boxShadow: 1,
            borderRadius: "16px",
            p: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Box sx={{ display: "flex", mt: "20px" }}>
              {booking.pets !== null && (
                <Avatar
                  src={booking.pets.photo_url}
                  alt="pet avatar"
                  sx={{
                    width: 120,
                    height: 120,
                    marginRight: 5,
                    boxShadow: 3,
                  }}
                />
              )}
              {booking.pets === null && (
                <Avatar
                  src={booking.users.photo_url}
                  alt="pet avatar"
                  sx={{
                    width: 120,
                    height: 120,
                    marginRight: 5,
                    boxShadow: 3,
                  }}
                />
              )}
            </Box>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
          </Box>
        </Card>
      </>
    );
  });

  return (
    <div>
      <Container maxWidth="sm">
        {userBookings.length > 0 && (
          <Typography variant="h5" m="30px">
            Upcoming Bookings
          </Typography>
        )}
        {userBookingsMapped}
        {archivedBookings.length > 0 && (
          <Typography variant="h5" m="30px">
            Past/Archived Bookings
          </Typography>
        )}
        {archiveBookingsMapped}
      </Container>
    </div>
  );
}
