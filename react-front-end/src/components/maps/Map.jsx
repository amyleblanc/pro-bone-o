import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import Geocode from "react-geocode";
import "./Map.css";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


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

  const MarkersList = () => {
    const [markerCoords, setMarkerCoords] = useState([]);
  
    useEffect(() => {
      for (let listItem of listing) {
        let postal = listItem.postal_code;
        Geocode.fromAddress(postal).then(
          response => {
            const {lat, lng} = response.results[0].geometry.location;
            setMarkerCoords(coords => [...coords, {lat, lng}]);
          },
          error => {
            console.error(error);
          },
        );
      }
    }, []);

    const handleClick = () => {
      return(
        <>
        </>
      )
    }
  
    return (
      <>
        {markerCoords.map((coords, index) => (
          <Marker title={'marker'} name={'name'} key={index} position={coords} onClick={handleClick} />
        ))}
      </>
    );
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <main>
      <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle}>
        {listing && <MarkersList />}
      </GoogleMap>
    </main>
  );
}
