import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Map.css'

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: 44,
  lng: -80
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC-XEq_cPJtonnlHDxjmiEMtqItcMaYUkA"
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
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker></Marker>
        <></>
      </GoogleMap>
  ) : <>Error Loading Map</>
}

export default React.memo(Map)