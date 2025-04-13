import React from "react";
import ToiletResultTile from "../ToiletResultTile/ToiletResultTile";

const ToiletResult = ({ markers, selectedMarkerId }) => {
  return (
    <>
      <h1>Search Toilets Within Radius</h1>
      <div>
        <h2>Results:</h2>
        {markers?.map((toilet) => (
          <ToiletResultTile
            toilet={toilet}
            selectedMarkerId={selectedMarkerId}
          />
        ))}
      </div>
    </>
  );
};

export default ToiletResult;
