import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css';

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Mapa />;
}

const containerStyle = {
  width: '800px',
  height: '600px',
  margin: '20px'
};

function Mapa() {
  const center = useMemo(() => ({ lat: 49.279115, lng: -123.051945 }), []);

  return (
    <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle}>
      <Marker position={center} />
    </GoogleMap>
  );
}