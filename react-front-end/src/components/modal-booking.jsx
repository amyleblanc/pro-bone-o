import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue } from "recoil";
import userState from "./atoms";
import Chat from "./Chat";
import SendIcon from "@mui/icons-material/Send";
import axiosRequest from "../helper/axios";

const updateMessageCountDB = async (bookingID) => {
  axiosRequest(
    `${process.env.REACT_APP_host}/booking/status/${bookingID}`,
    "PUT",
    {
      viewed: true,
    }
  );
};

export default function ResponsiveBooking(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useRecoilValue(userState);
  const { booking_id, first_name, last_name, profile_photo, view } = props;

  const handleClickOpen = () => {
    setOpen(true);
    updateMessageCountDB(booking_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogContent sx={{ p: 1 }}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
          sx={{
            borderRadius: "16px",
            bgcolor: "#00A8A8",
            p: "8px",
            width: "155px",
            boxShadow: 3,
          }}
        >
          {view}
        </Button>
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
        <DialogTitle>
          Your chat with {first_name} {last_name}!
        </DialogTitle>

        <Chat
          first_name={user.first_name}
          last_name={user.last_name}
          personal_photo={user.photo_url}
          id={booking_id}
          photo={profile_photo}
        ></Chat>
      </Dialog>
    </>
  );
}
