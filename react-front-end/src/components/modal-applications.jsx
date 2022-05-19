import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import SendIcon from "@mui/icons-material/Send";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material/";
import ResponsiveBooking from "./modal-booking";
import axios from "axios";
import axiosRequest from "../helper/axios";

const acceptBooking = async (bookingID, payload) => {
  axiosRequest(`/booking/status/${bookingID}`, "PUT", payload);
};

export default function ResponsiveApplications(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const user = useRecoilValue(userState);
  const { listing } = props;
  const [booking, setBooking] = React.useState({});
  const [count, setMessageCount] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptance = (bookingID) => {
    acceptBooking(bookingID, { accepted: true });
  };

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
    const messageCount = function () {
      let messageAmount = 0;
      if (booking["booking"]) {
        for (let each of booking["booking"]) {
          if (each["viewed"] === false) {
            messageAmount++;
          }
        }
      }
      return messageAmount;
    };
    setMessageCount(messageCount());
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
    const unread = each["viewed"] ? true : false;
    const personal_message = each["personal_message"]
      ? each["personal_message"]
      : " ";

    return (
      <Grid item>
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
            alt="Sitter"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {listing.activity_type} - {each.users.first_name}{" "}
              {each.users.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personal_message}
            </Typography>
          </CardContent>
          <CardActions>
            <ResponsiveBooking
              booking_id={each.id}
              first_name={each.users.first_name}
              last_name={each.users.last_name}
            />
          </CardActions>
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={handleAcceptance(each.id)}
            sx={{ borderRadius: "16px" }}
          >
            Accept Application
          </Button>
        </Card>
      </Grid>
    );
  });

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
      {count} Unread Messages
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <Button autoFocus onClick={handleClose}>
          <CloseIcon />
        </Button>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {useBooking}
        </Grid>
      </Dialog>
    </div>
  );
}
