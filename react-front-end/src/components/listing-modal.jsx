import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ListingForm from "./form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function CreateListingModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogContent sx={{ p: 1 }}>
        <Tooltip title="Add a Listing">
          <IconButton aria-label="add listing">
            <Button
              variant="contained"
              endIcon={<AddCircleIcon fontSize="large" />}
              onClick={handleClickOpen}
              sx={{
                borderRadius: "16px",
                bgcolor: "#00A8A8",
                p: "8px",
                width: "225px",
              }}
            >
              Create a new Listing!
            </Button>
          </IconButton>
        </Tooltip>
      </DialogContent>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={false}
        maxWidth="md"
      >
        <Button autoFocus onClick={handleClose} sx={{justifyContent: "flex-end", marginTop: 2, marginRight: 2}}>
          <CloseIcon />
        </Button>
        <DialogTitle></DialogTitle>
        <ListingForm />
      </Dialog>
    </>
  );
}
