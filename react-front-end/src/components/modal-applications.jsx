import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue } from "recoil";
import userState from "./atoms";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material/";
import ResponsiveBooking from "./modal-booking";
import moment from "moment";
import axios from "axios";
import ResponsiveDialog from "./modal-popup";

export default function ResponsiveApplications(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const user = useRecoilValue(userState);
  const { listing } = props;
  const [booking, setBooking] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   axiosRequest(url, "GET").then((res) => setListings(res));
  // }, [url]);

  useEffect(() => {
    const getSearch = async () => {
      const id = listing.id;
      //console.log("this is id", id);
      const res = await axios
        .get(`/api/listings/bookings/${id}`)
        .then((res) => {
          //console.log("this is res", res.data);
          setBooking(res.data);
        });
    };
    getSearch();
    console.log("this is booking", booking);
  }, []);
  // useEffect(() => {
  //   const url = `/api/listing/${id}`;
  //   axiosRequest(url, "GET", {}).then((res) => setListing(res));
  // }, [id]);

  // const useBooking = booking["booking"].map((listing) => {
  //   console.log(listing);
  // });
  //console.log("booking test two", booking["booking"]);

  // for (let each of booking["booking"]) {
  //   console.log("booking each", each);
  // }

  const useBooking = booking["booking"]?.map((each) => {
    console.log("users", each["users"]);
    console.log("regular each", each);

    return (
      <Card
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          //minWidth: 300,
          //maxWidth: 345,
          // ml: 30,
          mt: 5,
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={each.users.photo_url}
          alt="Dog"
        />
        {!listing.pets && (
          <CardMedia
            component="img"
            height="140"
            image={listing.users.photo_url}
            alt="Sitter"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listing.activity_type} - {each.users.first_name}{" "}
            {each.users.last_name}
          </Typography>
          {/* here would add booking personal message */}
          <Typography variant="body2" color="text.secondary">
            {listing.additional_details}
          </Typography>
        </CardContent>
        <CardActions>
          <ResponsiveBooking
            booking_id={each.id}
            first_name={each.users.first_name}
            last_name={each.users.last_name}
            profile_photo={each.users.photo_url}
          />
        </CardActions>
      </Card>
    );
  });

  //const useBooking = booking["booking"].map((each) => {
  //console.log(each);
  // <Card
  //   sx={{
  //     display: "flex",
  //     flexDirection: "column",
  //     maxWidth: 552,
  //     minWidth: 200,
  //     bgcolor: "#ffde5a",
  //     boxShadow: 1,
  //     borderRadius: "16px",
  //     p: 2,
  //     mb: 4,
  //   }}
  // >
  //   <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
  //     <Box sx={{ display: "flex", mt: "20px" }}>
  //       <Avatar
  //         src={booking.pets.photo_url}
  //         alt="pet avatar"
  //         sx={{ width: 120, height: 120, marginRight: 5 }}
  //       />
  //     </Box>
  //     <CardContent sx={{ width: 280 }}>
  //       <Typography variant="h6" gutterBottom>
  //         {moment(booking.start_time).format("LL")}
  //       </Typography>
  //       <Box sx={{ display: "flex", flexDirection: "row" }}>
  //         <Typography align="center" gutterBottom>
  //           {`${moment(booking.start_time).format("LT")} to ${moment(
  //             booking.end_time
  //           ).format("LT")}`}
  //         </Typography>
  //       </Box>
  //       <Typography gutterBottom>
  //         {`${
  //           booking.activity_type.charAt(0).toUpperCase() +
  //           booking.activity_type.slice(1)
  //         } with ${booking.pets.name}`}
  //       </Typography>
  //       <Typography mt="20px">
  //         <b>Status: </b>
  //         {booking.accepted ? "Accepted" : "Pending"}
  //       </Typography>
  //     </CardContent>
  //   </Box>
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexDirection: "row",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       flexWrap: "wrap",
  //     }}
  //   >
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <CardActions sx={{ width: 170 }}>
  //         <ResponsiveBooking
  //           booking_id={booking.id}
  //           first_name={booking.users.first_name}
  //           last_name={booking.users.last_name}
  //           profile_photo={booking.users.photo_url}
  //         />
  //       </CardActions>
  //     </Box>
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <CardActions sx={{ width: 170 }}>
  //         <Button
  //           variant="contained"
  //           color="error"
  //           sx={{ borderRadius: "16px" }}
  //         >
  //           Cancel Booking
  //         </Button>
  //       </CardActions>
  //     </Box>
  //   </Box>
  // </Card>
  //});

  return (
    <div>
      <DialogContent>
        <Button
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
          sx={{ borderRadius: "16px" }}
        >
          See Applications
        </Button>
      </DialogContent>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Button autoFocus onClick={handleClose}>
          <CloseIcon />
        </Button>
        <Grid item xs={12} sm={4} md={4}>
          {useBooking}
        </Grid>
      </Dialog>
    </div>
  );
}
