import React, { useState, useEffect, useRef } from "react";
import { fetchPhoto } from "../../services/ToiletSearchService";
import "./ToiletDetail.css";
import ReactStars from "react-rating-stars-component";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import noPhotoAvailable from "../../assets/no-photo-available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ToiletDetail = ({
  toiletDetails,
  setSelectedMarkerId,
  setToiletDetails,
}) => {
  const [photos, setPhotos] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const currentPhotoIndex = useRef(0);
  const preparePhotos = async (toiletDetails) => {
    const photos = [];
    if (toiletDetails.photos && toiletDetails.photos.length > 0) {
      toiletDetails.photos.forEach((photo) => {
        photos.push({
          original: photo.uri,
          fullscreen: photo.uri,
        });
      });
    }
    if (
      toiletDetails.googleMapsPhotos &&
      toiletDetails.googleMapsPhotos.length > 0
    ) {
      toiletDetails.googleMapsPhotos.forEach((photo) => {
        photos.push({
          isToBeFetchedOriginal: !photo.uri,
          isToBeFetchedFullscreen: !photo.uri,
          original: photo.uri
            ? photo.uri
            : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif",
          fullscreen: photo.uri
            ? photo.uri
            : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif",
          name: photo.name,
          description: photo.authorAttribution.userName,
          height: photo.height,
          width: photo.width,
        });
      });
    }
    // If first photo has no url and has a name (from google maps), fetch the url from google maps api
    if (
      photos.length > 0 &&
      photos[0].isToBeFetchedOriginal &&
      photos[0].name
    ) {
      const firstPhoto = photos[0];
      const photo = await fetchPhoto(firstPhoto.name, 400, 400);
      // Create photo url from content
      firstPhoto.original = "data:image/png;base64," + photo;
      firstPhoto.isToBeFetchedOriginal = false;
    }
    return photos;
  };

  useEffect(() => {
    currentPhotoIndex.current = 0;
    setIsFullScreen(false);
    const fetchPhotos = async () => {
      const preparedPhotos = await preparePhotos(toiletDetails);
      setPhotos(preparedPhotos);
    };
    fetchPhotos();
  }, [toiletDetails]);

  const handleOnSlide = (index) => {
    console.log("isFullScreen ?", isFullScreen);
    console.log("Slide changed to index:", index);
    currentPhotoIndex.current = index;
    const currentPhoto = photos[index];
    if (
      !isFullScreen &&
      currentPhoto &&
      currentPhoto.name &&
      currentPhoto.isToBeFetchedOriginal
    ) {
      fetchPhoto(currentPhoto.name, 400, 400)
        .then((content) => {
          const photoUrl = "data:image/png;base64," + content;
          const updatedPhotos = [...photos];
          updatedPhotos[index].original = photoUrl;
          updatedPhotos[index].isToBeFetchedOriginal = false;
          setPhotos(updatedPhotos);
        })
        .catch((error) => {
          console.error("Error fetching original photo URL:", error);
        });
    } else if (
      isFullScreen &&
      currentPhoto &&
      currentPhoto.name &&
      currentPhoto.isToBeFetchedFullscreen
    ) {
      fetchPhoto(currentPhoto.name, currentPhoto.height, currentPhoto.width)
        .then((content) => {
          const photoUrl = "data:image/png;base64," + content;
          const updatedPhotos = [...photos];
          updatedPhotos[index].fullscreen = photoUrl;
          updatedPhotos[index].isToBeFetchedFullscreen = false;
          setPhotos(updatedPhotos);
        })
        .catch((error) => {
          console.error("Error fetching fullscreen photo URL:", error);
        });
    }
  };

  const handleOnScreenChange = (value) => {
    const isFullScreen = value;
    console.log("Current photo index:", currentPhotoIndex.current);
    const currentPhoto = photos[currentPhotoIndex.current];
    console.log("Screen change to:", value);
    console.log("Current photo:", currentPhoto);
    if (
      !isFullScreen &&
      currentPhoto &&
      currentPhoto.name &&
      currentPhoto.isToBeFetchedOriginal
    ) {
      fetchPhoto(currentPhoto.name, 400, 400)
        .then((content) => {
          const photoUrl = "data:image/png;base64," + content;
          const updatedPhotos = [...photos];
          updatedPhotos[currentPhotoIndex.current].original = photoUrl;
          updatedPhotos[currentPhotoIndex.current].isToBeFetchedOriginal =
            false;
          setPhotos(updatedPhotos);
        })
        .catch((error) => {
          console.error("Error fetching original photo URL:", error);
        });
    } else if (
      isFullScreen &&
      currentPhoto &&
      currentPhoto.name &&
      currentPhoto.isToBeFetchedFullscreen
    ) {
      console.log("Fetching fullscreen photo for:", currentPhotoIndex.current);
      fetchPhoto(currentPhoto.name, currentPhoto.height, currentPhoto.width)
        .then((content) => {
          const photoUrl = "data:image/png;base64," + content;
          const updatedPhotos = [...photos];
          updatedPhotos[currentPhotoIndex.current].fullscreen = photoUrl;
          updatedPhotos[currentPhotoIndex.current].isToBeFetchedFullscreen =
            false;
          setPhotos(updatedPhotos);
        })
        .catch((error) => {
          console.error("Error fetching fullscreen photo URL:", error);
        });
    }
    setIsFullScreen(isFullScreen);
  };

  console.log("photos", photos);
  const distance =
    toiletDetails.distance >= 1
      ? toiletDetails.distance + "km"
      : toiletDetails.distance * 1000 + "m";

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
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div
          className={`detail-panel__photos ${
            isFullScreen ? "fullscreen" : "original"
          }`}
        >
          {photos && photos.length > 0 ? (
            <ImageGallery
              items={photos}
              onSlide={handleOnSlide}
              showBullets={true}
              showPlayButton={false}
              onScreenChange={(value) => handleOnScreenChange(value)}
            />
          ) : (
            <img src={noPhotoAvailable} alt="No photo available" />
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
            <span>{toiletDetails.type}</span> ·{" "}
            <span>{toiletDetails.address}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ToiletDetail);
