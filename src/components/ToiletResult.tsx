import React from "react";
import ToiletResultTile from "./ToiletResultTile";

const ToiletResult = ({ markers }) => {
  return (
    <div>
      <h1>Search Toilets Within Radius</h1>
      <div>
        <h2>Results:</h2>
        {markers?.map((toilet) => (
          <ToiletResultTile toilet={toilet} />
        ))}
      </div>
    </div>
  );
};

export default ToiletResult;
