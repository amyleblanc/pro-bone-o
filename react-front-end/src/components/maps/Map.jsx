import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import coords from "./GeoCode";

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
    let postal = listing.users.postal_code
    console.log(postal);
    let listingcoords = coords(postal);
    console.log(listingcoords);
    // if (listing.users.postal_code) {
    //   listingcoords = coords(listing.users.postal_code);
    // }
    // console.log(listingcoords);
    
    let title = listing.activity_type + " with ";
    let name = "";
    if (listing.pets) {
      title += listing.pets.name;
      name = listing.pets.name[0];
    } else {
      title += listing.users.first_name;
      name = listing.users.first_name;
    }

    return (
      <Marker
        title={{ title }}
        name={name}
        key={listing.id}
        position={listingcoords}
      />
    );
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <main>
      <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle}>
        {listing && useListing}
      </GoogleMap>
    </main>
  );
}
