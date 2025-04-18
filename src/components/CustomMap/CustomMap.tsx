import React, { useState, useEffect, useRef } from "react";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import ToiletSearch from "../ToiletSearch/ToiletSearch";
import "./CustomMap.css";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const Markers = ({
  markers,
  hoverMarkerId,
  setHoverMarkerId,
  selectedMarkerId,
  setSelectedMarkerId,
}) => {
  return markers?.map((marker) => {
    return (
      <AdvancedMarker
        key={marker.id}
        position={marker.position}
        title={marker.name}
        onMouseEnter={() => setHoverMarkerId(marker.id)}
        onMouseLeave={() => setHoverMarkerId(null)}
        onClick={() => setSelectedMarkerId(marker.id)}
        className={"custom-marker"}
        style={{
          transform: `scale(${
            [hoverMarkerId, selectedMarkerId].includes(marker.id) ? 1.3 : 1
          })`,
          //transformOrigin: AdvancedMarkerAnchorPoint["BOTTOM"].join(" "),
        }}
      >
        <Pin
          background={selectedMarkerId === marker.id ? "#04aa6d" : null}
          borderColor={selectedMarkerId === marker.id ? "#405d27" : null}
          glyphColor={selectedMarkerId === marker.id ? "#405d27" : null}
        />
      </AdvancedMarker>
    );
  });
};

const CustomMap = (props) => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState({});
  const [doInitialSearch, setDoInitialSearch] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  let mapBounds = useRef({});

  let isInit = useRef(true);

  useEffect(() => {
    if (!props.selectedMarkerId) return;
    console.log("Selected marker ID:", props.selectedMarkerId);
    //Get position of selected marker
    const selectedMarker = props.markers.find(
      (marker) => marker.id === props.selectedMarkerId
    );
    if (selectedMarker) {
      const { lat, lng } = selectedMarker.position;
      console.log("Selected marker position:", { lat, lng });
      //setCurrentPosition({ lat, lng });
      map?.panTo({ lat, lng });
    }
  }, [props.selectedMarkerId]);

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
              setMarkers={props.setMarkers}
              doInitialSearch={doInitialSearch}
              showSearchButton={showSearchButton}
              setShowSearchButton={setShowSearchButton}
            />
          ) : (
            ""
          )}
          <Map
            mapId={process.env.GOOGLE_MAP_ID}
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
            <Markers
              markers={props.markers}
              hoverMarkerId={props.hoverMarkerId}
              setHoverMarkerId={props.setHoverMarkerId}
              selectedMarkerId={props.selectedMarkerId}
              setSelectedMarkerId={props.setSelectedMarkerId}
            />
            <AdvancedMarker
              key={"myPos"}
              position={currentPosition}
              title={"Current position"}
            >
              <img
                src="http://www.robotwoods.com/dev/misc/bluecircle.png"
                alt="current position"
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
