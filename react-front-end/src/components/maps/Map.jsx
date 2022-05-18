import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './Map.css';

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Mapa />;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

function Mapa() {
  const center = useMemo(() => ({ lat: 49.279115, lng: -123.051945 }), []);
  const markerTest = useMemo(() => ({ lat: 49.277535969084596, lng: -123.05256805076216 }), []);

  return (
    <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle}>
      <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={markerTest} 
      />
    </GoogleMap>
  );
}
