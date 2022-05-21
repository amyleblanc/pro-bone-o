import * as React from "react";
import { useReducer } from "react";
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
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

const applyToPosting = async (formData) => {
  const processedForm = formData;
  axiosRequest(
    `${process.env.REACT_APP_host}/api/listings/apply/:id`,
    "POST",
    processedForm
  );
};

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      personal_message: "",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function ResponsiveDialog(props) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useRecoilState(userState);
  const userName = useRecoilValue(userState);
  const {
    id,
    sitter_listing,
    activity_type,
    postal_code,
    start_time,
    end_time,
    pet_name,
    pet_photo,
    phone_number,
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
    const applicationPackage = {
      user_id: userName.id,
      listing_id: id,
      personal_message: formData.personal_message,
      phone_number: phone_number,
      name: userName.first_name,
    };

    const getUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_host}/login/${userName.id}`
      );
      //console.log(res.data);
      setUser(res.data);
    };
    applyToPosting(applicationPackage).then(() => getUser());
    setOpen(false);
  };

  const handleText = (event) => {
    //console.log(event.target.name);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  // useEffect(() => {
  //   const url = `/api/listing/${id}`;
  //   axiosRequest(url, "GET", {}).then((res) => setListing(res));
  // }, [id]);

  return (
    <div>
      {user.id && (
        <DialogContent>
          <Button
            variant="contained"
            endIcon={<PetsIcon />}
            onClick={handleClickOpen}
            sx={{
              bgcolor: "#00A8A8",
              borderRadius: "16px",
            }}
          >
            Apply Now!
          </Button>
        </DialogContent>
      )}
      {!user.id && (
        <DialogContent>
          <Button
            variant="contained"
            endIcon={<PetsIcon />}
            onClick={handleClickOpen}
            sx={{
              bgcolor: "#00A8A8",
              borderRadius: "16px",
            }}
          >
            View Posting!
          </Button>
        </DialogContent>
      )}

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
        {user.id && (
          <DialogContent>
            <DialogContentText>
              Send a Personal Message with your application!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="personal_message"
              name="personal_message"
              label="Enter Personal Message Here"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleText}
            />
          </DialogContent>
        )}
        {!user.id && (
          <DialogContent>
            <DialogContentText>
              <Link style={{ textDecoration: "none" }} to={`/Login`}>
                <Button>Login</Button>
              </Link>
              or
              <Link style={{ textDecoration: "none" }} to={`/registerUser`}>
                <Button>Register</Button>
              </Link>{" "}
              to apply to this posting!
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {user.id && (
            <Button onClick={handleApply} autoFocus>
              Apply!
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
