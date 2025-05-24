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
    selectedMarkerId === toilet.googlePlaceId
      ? " selected"
      : hoverMarkerId === toilet.googlePlaceId
      ? " hover"
      : "";
  const distance = toilet.distance >= 1 ? toilet.distance + 'km' : toilet.distance * 1000 + 'm';
  return (
    <div
      className={"tileContainer fontBodyMedium" + additionalClassName}
      onClick={() => {
        setSelectedMarkerId(toilet.googlePlaceId);
      }}
      onMouseEnter={() => setHoverMarkerId(toilet.googlePlaceId)}
      onMouseLeave={() => setHoverMarkerId(null)}
    >
      <div className="title fontHeadlineSmall">
        {toilet.name} · {distance}
      </div>
      {toilet.ratingCount > 0 ? (
        <div className="rating">
          <span className="ratingValue">{toilet.rating}</span>
          <span className="ratingStars">
            <ReactStars
              key={toilet.googlePlaceId}
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
