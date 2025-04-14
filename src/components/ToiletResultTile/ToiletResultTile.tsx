import React from "react";
import "./ToiletResultTile.css";
import ReactStars from "react-rating-stars-component";

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
        {toilet.rating}
        <ReactStars
          count={5}
          size={15}
          activeColor="#ffd700"
          edit={false}
          value={toilet.rating}
          isHalf={true}
        />
        ({toilet.ratingCount})
      </div>
      <div className="typeAddress">
        <span>{toilet.type}</span> · <span>{toilet.address}</span>
      </div>
    </div>
  );
};

export default ToiletResultTile;
