import React from "react";
import ToiletResultTile from "../ToiletResultTile/ToiletResultTile";

const ToiletResult = ({
  markers,
  selectedMarkerId,
  hoverMarkerId,
  setSelectedMarkerId,
  setHoverMarkerId,
}) => {
  return (
    <>
      <h1>Search Toilets Within Radius</h1>
      <div>
        <h2>Results:</h2>
        {markers?.map((toilet) => (
          <ToiletResultTile
            toilet={toilet}
            selectedMarkerId={selectedMarkerId}
            hoverMarkerId={hoverMarkerId}
            setSelectedMarkerId={setSelectedMarkerId}
            setHoverMarkerId={setHoverMarkerId}
          />
        ))}
      </div>
    </>
  );
};

export default ToiletResult;
