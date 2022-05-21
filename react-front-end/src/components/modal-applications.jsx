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
} from "@mui/material/";
import ResponsiveBooking from "./modal-booking";
import axios from "axios";
import axiosRequest from "../helper/axios";
import Badge from "@mui/material/Badge";

const updateBooking = async (bookingID, payload) => {
  axiosRequest(
    `${process.env.REACT_APP_host}/booking/status/${bookingID}`,
    "PUT",
    payload
  );
};

const updateListing = async (listingID, payload) => {
  axiosRequest(
    `${process.env.REACT_APP_host}/listing/status/${listingID}`,
    "PUT",
    payload
  );
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

  const handleAcceptance = (bookingID, listingID, cancelArray) => {
    for (let each of cancelArray) {
      updateBooking(each["id"], { archived: true });
    }
    updateBooking(bookingID, { accepted: true, archived: false });
    updateListing(listingID, { accepted: true });
  };

  useEffect(() => {
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
    const getSearch = async () => {
      const id = listing.id;
      //console.log("this is id", id);
      // eslint-disable-next-line
      const res = await axios
        .get(`${process.env.REACT_APP_host}/api/listings/bookings/${id}`)
        .then((res) => {
          //console.log("this is res", res.data);
          setBooking(res.data);
        });
    };
    getSearch().then(() => setMessageCount(messageCount()));

    // setMessageCount(messageCount());
    console.log("this is booking", booking);
  }, []);

  let acceptedStatus = false;

  const accepted = booking["booking"]?.map((each) => {
    const personal_message = each["personal_message"]
      ? each["personal_message"]
      : " ";
    if (each["accepted"]) {
      acceptedStatus = true;
      return (
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Card
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
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
                view={"Chat"}
              />
            </CardActions>
          </Card>
        </Grid>
      );
    } else {
      return <></>;
    }
  });

  const useBooking = booking["booking"]?.map((each) => {
    console.log("users", each["users"]);
    console.log("regular each", each);
    console.log("booking", each["accepted"]);
    const personal_message = each["personal_message"]
      ? each["personal_message"]
      : " ";

    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
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
              view={"Send Message"}
            />
          </CardActions>
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={() => {
              handleAcceptance(each.id, listing.id, booking["booking"]);
            }}
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
        {acceptedStatus && (
          <Badge badgeContent={count} color="primary">
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={handleClickOpen}
              sx={{ borderRadius: "16px" }}
            >
              See Accepted Booking
            </Button>
          </Badge>
        )}
        {!acceptedStatus && (
          <Badge badgeContent={count} color="primary">
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={handleClickOpen}
              sx={{ borderRadius: "16px" }}
            >
              See Applications
            </Button>
          </Badge>
        )}
      </DialogContent>
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
          {acceptedStatus && accepted}
          {!acceptedStatus && useBooking}
        </Grid>
      </Dialog>
    </div>
  );
}
