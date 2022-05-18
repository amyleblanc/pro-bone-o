import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./Map.css";

export default function Map(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [listing, setListing] = useState([]);
  const { url, payload } = props;
  const center = useMemo(() => ({ lat: 49.279115, lng: -123.051945 }), []);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  useEffect(() => {
    const getSearch = async () => {
      const res = await axios
        .post(url, payload)
        .then((res) => setListing(res.data));
    };
    getSearch();
  }, [url, payload]);

  const useListing = listing.map((listing) => {
    let title = listing.activity_type + " with ";
    title += listing.sitter_listing
      ? listing.pets.name
      : listing.users.first_name;
    //console.log(listing);
    const latitude = 49.277535969084596;
    const longitude = -123.05256805076216;
    return (
      <Marker
        title={title}
        name={"SOMA"}
        position={{ lat: 49.277535969084596, lng: -123.05256805076216 }}
      />
    );
  });

  return (
    <main>
      <h1>Map of Listings</h1>
      <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle}>
        {listing && useListing}
      </GoogleMap>
    </main>
  );
}
