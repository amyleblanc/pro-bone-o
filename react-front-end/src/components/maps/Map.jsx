import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Map.css'

const containerStyle = {
  width: '800px',
  height: '600px',
  margin: '20px'
};

const center = {
  lat: 49.279046,
  lng: -123.051898,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat:44, lng:-80}}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={{lat: 49.279046, lng: -123.051898}} />
        <></>
      </GoogleMap>
  ) : <>Error Loading Map</>
}

export default React.memo(Map)