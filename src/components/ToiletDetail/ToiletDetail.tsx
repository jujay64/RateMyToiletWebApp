import React, { useState, useEffect, useRef } from "react";
import { fetchPhotoUrl } from "../../services/ToiletSearchService";
import "./ToiletDetail.css";
import ReactStars from "react-rating-stars-component";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const ToiletDetail = ({
  toiletDetails,
  setSelectedMarkerId,
  setToiletDetails,
}) => {
  const [photos, setPhotos] = useState([]);

  const preparePhotos = async (toiletDetails) => {
    const photos = [];
    if (toiletDetails.photos && toiletDetails.photos.length > 0) {
      toiletDetails.photos.forEach((photo) => {
        photos.push({
          original: photo.uri,
          
        });
      });
    }
    if (toiletDetails.googleMapsPhotos && toiletDetails.googleMapsPhotos.length > 0) {
      toiletDetails.googleMapsPhotos.forEach((photo) => {
        photos.push({
          isToBeFetched: !photo.uri,
          original: photo.uri ? photo.uri : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif",
          name: photo.name,
          description: photo.authorAttribution.userName,
          height: photo.height,
          width: photo.width
        });
      });
    }
    // If first photo has no url and has a name (from google maps), fetch the url from google maps api
    if (photos.length > 0 && photos[0].isToBeFetched && photos[0].name) {
      const firstPhoto = photos[0];
      const photoUrl = await fetchPhotoUrl(firstPhoto.name, firstPhoto.height, firstPhoto.width);
      console.log("photoUrl", photoUrl);
      firstPhoto.original = photoUrl;
      firstPhoto.isToBeFetched = false;
    }
    return photos;
  }
  
  useEffect(() => {
    const fetchPhotos = async () => {
      const preparedPhotos = await preparePhotos(toiletDetails);
      setPhotos(preparedPhotos);
    };
    fetchPhotos();
  }, [toiletDetails]);


  const handleOnSlide = (index) => {
    console.log("Slide changed to index:", index);
    const currentPhoto = photos[index];
    if (currentPhoto && currentPhoto.name && currentPhoto.isToBeFetched) {
      fetchPhotoUrl(currentPhoto.name, currentPhoto.height, currentPhoto.width)
        .then((url) => {
          const updatedPhotos = [...photos];
          updatedPhotos[index].original = url;
          updatedPhotos[index].isToBeFetched = false;
          setPhotos(updatedPhotos);
        })
        .catch((error) => {
          console.error("Error fetching photo URL:", error);
        });
    }
  };
  console.log("photos", photos);
  const distance = toiletDetails.distance >= 1 ? toiletDetails.distance + 'km' : toiletDetails.distance * 1000 + 'm';

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
          {photos && photos.length > 0 ? (
            <ImageGallery items={photos} onSlide={handleOnSlide} showBullets={true} showPlayButton={false}/>
          ) : (
            <div className="detail-panel__no-photo">No photo available</div>
          )}
        </div>
        <div className="detail-panel__info">
          <div className="title fontHeadlineSmall">
                  {toiletDetails.name} · {distance}
                </div>
                {toiletDetails.ratingCount > 0 ? (
                  <div className="rating">
                    <span className="ratingValue">{toiletDetails.rating}</span>
                    <span className="ratingStars">
                      <ReactStars
                        key={toiletDetails.googlePlaceId}
                        count={5}
                        size={15}
                        activeColor="#ffd700"
                        edit={false}
                        value={toiletDetails.rating}
                        isHalf={true}
                        classNames="ratingStars"
                      />
                    </span>
                    <span className="ratingCount">({toiletDetails.ratingCount})</span>
                  </div>
                ) : (
                  <div className="rating">No reviews yet</div>
                )}
                <div className="typeAddress">
                  <span>{toiletDetails.type}</span> · <span>{toiletDetails.address}</span>
                </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ToiletDetail);
