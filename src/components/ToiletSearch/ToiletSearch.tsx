import React, { useEffect } from "react";
import { fetchWithinBox } from "../../services/ToiletSearchService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./ToiletSearch.css";

const ToiletSearch = ({
  currentPosition,
  mapBounds,
  setMarkers,
  doInitialSearch,
  showSearchButton,
  setShowSearchButton,
  setSelectedMarkerId
}) => {
  const handleSearchInArea = async () => {
    if (
      !mapBounds ||
      Object.entries(mapBounds).length === 0 ||
      !mapBounds.current ||
      Object.entries(mapBounds.current).length === 0
    ) {
      return;
    }
    setSelectedMarkerId(null);
    setShowSearchButton(false);
    console.log("ToiletSearch : Fetch data called");
    console.log("currentPosition : " + JSON.stringify(currentPosition));
    console.log("mapBounds : " + JSON.stringify(mapBounds));
    const lowerLeftCoords = mapBounds.current.getSouthWest();
    const upperRightCoords = mapBounds.current.getNorthEast();
    console.log("lower : " + JSON.stringify(lowerLeftCoords));
    console.log("upper : " + JSON.stringify(upperRightCoords));
    const results = await fetchWithinBox(
      currentPosition,
      lowerLeftCoords,
      upperRightCoords
    );
    console.log("results : " + JSON.stringify(results));
    setMarkers(results);
  };

  useEffect(() => {
    handleSearchInArea();
  }, [doInitialSearch]);

  console.log("Render search!");
  return (
    <div className="search-this-area">
      {showSearchButton ? (
        <button
          className="search-this-area-button"
          onClick={handleSearchInArea}
        >
          <div className="search-button-inside">
            <span className="search-button-icon-container">
              <FontAwesomeIcon
                className={"search-button-icon"}
                icon={faMagnifyingGlass}
              />
            </span>
            <span>Search in this area</span>
          </div>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToiletSearch;
