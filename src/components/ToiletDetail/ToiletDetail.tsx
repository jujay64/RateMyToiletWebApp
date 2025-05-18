import React from "react";
import "./ToiletDetail.css";

const ToiletDetail = ({
  toiletDetails,
  setSelectedMarkerId,
  setToiletDetails,
}) => {
  return (
    <>
      <div className={`detail-panel`}>
        <button
          className="detail-panel__close-button"
          onClick={() => {
            setSelectedMarkerId(null), setToiletDetails({});
          }}
          aria-label="Close"
        >
          Close
        </button>
        <div className="detail-panel__photos">
          {toiletDetails.photos && toiletDetails.photos.length > 0 ? (
            <img
              src={toiletDetails.photos[0].getUrl()}
              alt="Toilet"
              className="detail-panel__photo"
            />
          ) : (
            <div className="detail-panel__no-photo">No photo available</div>
          )}
        </div>
        <div className="detail-panel__info">
          <h2 className="detail-panel__title">{toiletDetails.name}</h2>
          <p className="detail-panel__address">{toiletDetails.address}</p>
          <p className="detail-panel__rating">
            Rating: {toiletDetails.rating} ({toiletDetails.ratingCount} reviews)
          </p>
          <p className="detail-panel__type">Type: {toiletDetails.type}</p>
          <p className="detail-panel__distance">
            Distance: {toiletDetails.distance} km
          </p>
        </div>
      </div>
    </>
  );
};

export default ToiletDetail;
