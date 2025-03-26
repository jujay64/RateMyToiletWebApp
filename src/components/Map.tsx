import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute'
};

const Markers = ({ markers }) => {
  return markers?.map(marker => {
    return (
      <Marker key={marker.id} position={marker.position} title={marker.name}/>
    );
  });
};

const Map = ({ currentPosition, markers}) => {
  console.log('markers : ' + JSON.stringify(markers));
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: currentPosition.latitude, lng: currentPosition.longitude}}
        zoom={15}
        options={{scaleControl:true, zoomControl:true, mapTypeControl:false}}
      >
        <Markers markers={markers} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;