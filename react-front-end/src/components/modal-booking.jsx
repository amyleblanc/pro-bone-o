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

export default function ResponsiveBooking(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useRecoilValue(userState);
  const { booking_id, first_name, last_name, profile_photo } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   const url = `/api/listing/${id}`;
  //   axiosRequest(url, "GET", {}).then((res) => setListing(res));
  // }, [id]);

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
          Send Message
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
    </div>
  );
}
