import React from "react";
import "./ToiletResultTile.css";

const ToiletResultTile = ({
  toilet,
  selectedMarkerId,
  hoverMarkerId,
  setSelectedMarkerId,
  setHoverMarkerId,
}) => {
  const additionalClassName =
    selectedMarkerId === toilet.id
      ? " selected"
      : hoverMarkerId === toilet.id
      ? " hover"
      : "";
  return (
    <div
      className={"tileContainer fontBodyMedium" + additionalClassName}
      onClick={() => {
        setSelectedMarkerId(toilet.id);
      }}
      onMouseEnter={() => setHoverMarkerId(toilet.id)}
      onMouseLeave={() => setHoverMarkerId(null)}
    >
      <div className="title fontHeadlineSmall">
        {toilet.name} · {toilet.distance}km
      </div>
      <div className="rating">
        {toilet.rating} ({toilet.ratingCount})
      </div>
      <div className="typeAddress">
        <span>{toilet.type}</span> · <span>{toilet.address}</span>
      </div>
    </div>
  );
};

export default ToiletResultTile;
