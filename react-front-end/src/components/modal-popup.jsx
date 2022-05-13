import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "./atoms";
import axiosRequest from "../helper/axios";
import axios from "axios";

const applyToPosting = async (formData) => {
  const processedForm = formData;
  axiosRequest("/api/listings/apply/:id", "POST", processedForm);
};

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useRecoilState(userState);
  const userName = useRecoilValue(userState);
  const [listing, setListing] = React.useState("");
  const {
    id,
    sitter_listing,
    user_id,
    activity_type,
    additional_details,
    postal_code,
    start_time,
    end_time,
    pet_id,
    pet_name,
    pet_photo,
  } = props;

  const start = new Date(start_time);
  const end = new Date(end_time);
  const startDate = start.toString().slice(0, 15);
  const endDate = end.toString().slice(0, 15);
  // let startTime = start.toString().slice(16);
  // let endTime = end.toString().slice(16);

  const startTime = start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const endTime = end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    const applicationPackage = { user_id: userName.id, listing_id: id };

    const getUser = async () => {
      const res = await axios.get(`/login/${id}`);
      console.log(res.data);
      setUser(res.data);
    };
    applyToPosting(applicationPackage).then(() => getUser());
    setOpen(false);
  };

  // useEffect(() => {
  //   const url = `/api/listing/${id}`;
  //   axiosRequest(url, "GET", {}).then((res) => setListing(res));
  // }, [id]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Apply Now!
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          {" "}
          <DialogTitle id="responsive-dialog-title">Listing</DialogTitle>
          <Button autoFocus onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
        <DialogContent>
          {!sitter_listing && (
            <DialogContentText>Request for a Sitter</DialogContentText>
          )}
          {sitter_listing && (
            <DialogContentText>Sitter Available to Sit!</DialogContentText>
          )}
          <DialogContent>
            {" "}
            <img
              style={{ maxWidth: "100%", height: "auto" }}
              src={pet_photo}
              alt="pet"
            />
          </DialogContent>
          <DialogContentText>
            Activity: {activity_type} with {pet_name}
          </DialogContentText>
          <DialogContentText>Area: {postal_code}</DialogContentText>
          <DialogContentText>Start Date: {startDate}</DialogContentText>
          <DialogContentText>Start Time: {startTime}</DialogContentText>
          <DialogContentText>End Date: {endDate}</DialogContentText>
          <DialogContentText>End Time: {endTime}</DialogContentText>
          <DialogContentText>
            Additional Details:
            {props.additional_details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply} autoFocus>
            Apply!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
