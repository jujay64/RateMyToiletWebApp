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
      {toilet.ratingCount > 0 ? (
        <div className="rating">
          <span className="ratingValue">{toilet.rating}</span>
          <span className="ratingStars">
            <ReactStars
              key={toilet.id}
              count={5}
              size={15}
              activeColor="#ffd700"
              edit={false}
              value={toilet.rating}
              isHalf={true}
              classNames="ratingStars"
            />
          </span>
          <span className="ratingCount">({toilet.ratingCount})</span>
        </div>
      ) : (
        <div className="rating">No reviews yet</div>
      )}
      <div className="typeAddress">
        <span>{toilet.type}</span> · <span>{toilet.address}</span>
      </div>
    </div>
  );
};

export default ToiletResultTile;
