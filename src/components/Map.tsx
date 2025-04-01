import React, {useState, useEffect, useRef} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ToiletSearch from './ToiletSearch';

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

const Map = ({ markers, setMarkers }) => {
  const [map, setMap] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [doInitialSearch, setDoInitialSearch] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  let mapBounds = useRef({});
  let center = useRef({});
  let isInit = useRef(true);

  const getCurrentPosition = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = await position.coords.latitude;
        const longitude = await position.coords.longitude;
        setCurrentPosition({lat: latitude, lng: longitude});
        center.current = {lat: latitude, lng: longitude};
      }, function(msg){
         alert('Please authorize GPS position feature.');
      }, {enableHighAccuracy: true}
      );
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleOnIdle = () => {
    console.log('show search button ? ' + (showSearchButton === true))
    console.log('bounds : old = ' + JSON.stringify(mapBounds.current) +', new=' + JSON.stringify(map.state.map.getBounds()));
    const hasMoved = checkHasMoved(mapBounds.current, map.state.map.getBounds());
    mapBounds.current = map.state.map.getBounds();
    console.log('Map bounds : ' + JSON.stringify(mapBounds));
    const lat = map.state.map.getCenter().lat()
    const lng = map.state.map.getCenter().lng()
    const mapCenter = {
      lat: lat,
      lng: lng,
    }
    center.current = mapCenter; // move the marker to new location
    console.log('init ? ' + (isInit.current === true ? 'true' : 'false'));
    if(isInit.current === true){
      setDoInitialSearch(true);
      isInit.current = false;
    }
    else if(hasMoved){
      console.log('hasMoved!');
      setShowSearchButton(true);
    }
  }

  const checkHasMoved = (oldBounds, newBounds) => {
    if(Object.keys(oldBounds).length === 0 || Object.keys(newBounds).length === 0){
      return false;
    }
    console.log(oldBounds.getSouthWest().lat());
    if(oldBounds.getSouthWest().lat() != newBounds.getSouthWest().lat() || oldBounds.getSouthWest().lng() != newBounds.getSouthWest().lng()
       || oldBounds.getNorthEast().lat() != newBounds.getNorthEast().lat() ||  oldBounds.getNorthEast().lng() != newBounds.getNorthEast().lng()){
        return true;
    }
    else{
      return false;
    }
  }

  console.log('Render map!');
  const isSetPosition = currentPosition && currentPosition.lat && currentPosition.lng;
  const isSetBounds = mapBounds && mapBounds.current;
  return (
    <div>
    {isSetPosition ? (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      {isSetBounds ? (
      <ToiletSearch currentPosition={currentPosition} mapBounds={mapBounds} setMarkers={setMarkers} doInitialSearch={doInitialSearch} showSearchButton={showSearchButton} setShowSearchButton={setShowSearchButton}/>
      ) : ("")}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: center.current.lat , lng: center.current.lng}}
        zoom={16}
        options={{scaleControl:true, zoomControl:true, mapTypeControl:false}}
        ref={setMap}
        onIdle={handleOnIdle}
      >
        <Markers markers={markers} />
        <Marker
          key={"myPos"}
          icon="http://www.robotwoods.com/dev/misc/bluecircle.png"
          position={{lat: currentPosition.lat, lng: currentPosition.lng}}
          title={"Current position"}
        />
      </GoogleMap>
    </LoadScript>
    ) : ("")}
    </div>
  );
};

export default Map;