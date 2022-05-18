import React from "react";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const coords = function (postal) {
  Geocode.fromAddress(postal).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
};

export default coords;
