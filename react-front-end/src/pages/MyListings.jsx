import { useRecoilValue } from "recoil";
import userState from "../components/atoms";
import Listing from "../components/Listing";
import CreateListingModal from "../components/listing-modal";
import { Grid } from "@mui/material/";


export default function MyListings() {
  const user = useRecoilValue(userState);
  const user_id = user.id;
  const url = `/user/listings/${user_id}`;

  return (
    <>
      <Grid
        item
        container
        direction="row"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        <CreateListingModal />
      </Grid>
      <Listing
        url={`${process.env.REACT_APP_host}${url}`}
        type={"GET"}
        direction={"row-reverse"}
      />
    </>
  );
}
