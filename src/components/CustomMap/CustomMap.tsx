import React, { useState, useEffect, useRef } from "react";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import ToiletSearch from "../ToiletSearch/ToiletSearch";
import "./CustomMap.css";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const Markers = ({ markers }) => {
  return markers?.map((marker) => {
    return (
      <AdvancedMarker
        key={marker.id}
        position={marker.position}
        title={marker.name}
        label={{ text: `${marker.name}`, className: "marker-label" }}
      >
        <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
    );
  });
};

const CustomMap = ({ markers, setMarkers }) => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState({});
  const [doInitialSearch, setDoInitialSearch] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  let mapBounds = useRef({});

  let isInit = useRef(true);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = await position.coords.latitude;
          const longitude = await position.coords.longitude;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        function (msg) {
          alert("Please authorize GPS position feature.");
        },
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleOnIdle = () => {
    if (!map) return;
    console.log("show search button ? " + (showSearchButton === true));
    console.log(
      "bounds : old = " +
        JSON.stringify(mapBounds.current) +
        ", new=" +
        JSON.stringify(map.getBounds())
    );
    const hasMoved = checkHasMoved(mapBounds.current, map.getBounds());
    mapBounds.current = map.getBounds();
    console.log("Map bounds : " + JSON.stringify(mapBounds));
    console.log("init ? " + (isInit.current === true ? "true" : "false"));
    if (isInit.current === true) {
      setDoInitialSearch(true);
      isInit.current = false;
    } else if (hasMoved) {
      console.log("hasMoved!");
      setShowSearchButton(true);
    }
  };

  const checkHasMoved = (oldBounds, newBounds) => {
    if (
      Object.keys(oldBounds).length === 0 ||
      Object.keys(newBounds).length === 0
    ) {
      return false;
    }
    console.log(oldBounds.getSouthWest().lat());
    if (
      oldBounds.getSouthWest().lat() != newBounds.getSouthWest().lat() ||
      oldBounds.getSouthWest().lng() != newBounds.getSouthWest().lng() ||
      oldBounds.getNorthEast().lat() != newBounds.getNorthEast().lat() ||
      oldBounds.getNorthEast().lng() != newBounds.getNorthEast().lng()
    ) {
      return true;
    } else {
      return false;
    }
  };

  console.log("Render map!");
  const isSetPosition =
    currentPosition && currentPosition.lat && currentPosition.lng;
  const isSetBounds = mapBounds && mapBounds.current;
  return (
    <>
      {isSetPosition ? (
        <div>
          {isSetBounds ? (
            <ToiletSearch
              currentPosition={currentPosition}
              mapBounds={mapBounds}
              setMarkers={setMarkers}
              doInitialSearch={doInitialSearch}
              showSearchButton={showSearchButton}
              setShowSearchButton={setShowSearchButton}
            />
          ) : (
            ""
          )}
          <Map
            mapId={process.env.GOOGLE_MAPS_API_KEY}
            style={containerStyle}
            defaultCenter={currentPosition}
            defaultZoom={16}
            options={{
              scaleControl: true,
              zoomControl: true,
              mapTypeControl: false,
            }}
            disableDefaultUI={true}
            onIdle={handleOnIdle}
          >
            <Markers markers={markers} />
            <AdvancedMarker
              key={"myPos"}
              icon="http://www.robotwoods.com/dev/misc/bluecircle.png"
              position={currentPosition}
              title={"Current position"}
            >
              <Pin
                background={"#FBBC04"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          </Map>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomMap;
