import React, { useEffect, useState } from "react";
import "./listing.css";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosRequest from "../helper/axios";
import ResponsiveDialog from "./modal-popup";
//import { useRecoilValue } from "recoil";
import FilterBar from "./searchbar";
import searchState from "./atom-search";
import axios from "axios";
import { useRecoilState } from "recoil";

//const getListingState(//)

// const updateSearch = async (formData) => {
//   const processedForm = formData;
//   axiosRequest("/api/listing/filter", "POST", processedForm);
// };

/**
 *
 * @param {Object} props object contains axios function details for listing type including url and payload
 * @returns mapped listings object
 */
export default function Listing(props) {
  const [listing, setListing] = useState([]);
  const { url } = props;
  //const search = useRecoilValue(searchState);
  const [search, setSearch] = useRecoilState(searchState);

  const getSearchState = function () {
    console.log(search);
  };

  //searchString, sitterListing, startTime, endTime, accepted, archived;

  useEffect(() => {
    const getSearch = async () => {
      const res = await axios
        .post(`/api/listing/filter`)
        .then((res) => setListing(res.data));
      // console.log("res data", res.data);
      //console.log("res only", res);
    };
    getSearch();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("this is the search", search);
    //const updatedSearch = search;
    //updatedSearch["type"] = search["type"] === "sitter-request" ? true : false;
    const getSearch = async () => {
      const res = await axios
        .post(`/api/listing/filter`, search)
        .then((res) => setListing(res.data));
      // console.log("res data", res.data);
      console.log("res only", res);
    };
    getSearch();
    // updateSearch(search);
    //   // setListing(res);
    // });
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log(search);
    const getSearch = async () => {
      const res = await axios
        .post(`/api/listing/filter`)
        .then((res) => setListing(res.data));
      // console.log("res data", res.data);
      //console.log("res only", res);
    };
    getSearch();
    setSearch({});
    console.log("reset search", search);
    // updateSearch(search);
    //   // setListing(res);
    // });
  };

  // useEffect(() => {
  //   axiosRequest("/api/listing", "GET").then((res) => setListing(res));
  // });

  const useListing = listing.map((listing) => {
    console.log(listing);
    return (
      // <Grid container justifyContent="space-around">
      <Grid item xs={12} sm={4} md={4}>
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
          {listing.pets && (
            <CardMedia
              component="img"
              height="140"
              image={listing.pets.photo_url}
              alt="Dog"
            />
          )}
          {!listing.pets.photo_url && (
            <CardMedia
              component="img"
              height="140"
              image={listing.users.photo_url}
              alt="Sitter"
            />
          )}
          <CardContent>
            {listing.pets.name && (
              <Typography gutterBottom variant="h5" component="div">
                {listing.activity_type} - {listing.pets.name}
              </Typography>
            )}
            {!listing.pets.name && (
              <Typography gutterBottom variant="h5" component="div">
                {listing.activity_type} - {listing.users.first_name}{" "}
                {listing.users.last_name}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {listing.additional_details}
            </Typography>
          </CardContent>
          <CardActions>
            {listing.pets && (
              <ResponsiveDialog
                id={listing.id}
                sitter_listing={listing.sitter_listing}
                user_id={listing.user_id}
                additional_details={listing.additional_details}
                postal_code={listing.postal_code}
                start_time={listing.start_time}
                end_time={listing.end_time}
                pet_id={listing.pet_id}
                activity_type={listing.activity_type}
                pet_name={listing.pets.name}
                pet_photo={listing.pets.photo_url}
                phone_number={listing.users.phone_number}
              ></ResponsiveDialog>
            )}
            {!listing.pets && (
              <ResponsiveDialog
                id={listing.id}
                sitter_listing={listing.sitter_listing}
                user_id={listing.user_id}
                additional_details={listing.additional_details}
                postal_code={listing.postal_code}
                start_time={listing.start_time}
                end_time={listing.end_time}
                //pet_id={listing.pet_id}
                activity_type={listing.activity_type}
                pet_name={listing.users.name}
                pet_photo={listing.users.photo_url}
              ></ResponsiveDialog>
            )}
          </CardActions>
        </Card>
        {/* <initMap /> */}
      </Grid>
    );
  });

  return (
    <main>
      {/* <section>
        <div> */}
      <h1>Current Listings</h1>
      {/* search state button confirms that state is being updated */}
      <Button onClick={getSearchState}>Search State</Button>
      <FilterBar />
      <Button onClick={handleReset}>Reset Search</Button>
      <Button onClick={handleSubmit}>Execute Search</Button>
      {/* <FilterBar /> */}
      {/* <Grid container justifyContent="space-around"> */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {listing && useListing}
        {/* <div className="container">{listing && useListing}</div> */}
      </Grid>
      {/* </div>
      </section> */}
    </main>
  );
}
