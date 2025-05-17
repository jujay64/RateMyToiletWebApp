const fetchNearby = async (currentPosition, radius) => {
  console.log("fetchNearby called");
  console.log(JSON.stringify(currentPosition));
  return fetch(
    `https://${process.env.BACK_END_API_DOMAIN}:${process.env.BACK_END_API_PORT}${process.env.BACK_END_API_NEARBY_GET_URI}?latitude=${currentPosition.lat}&longitude=${currentPosition.lng}&radiusInKm=${radius}`
  )
    .then((response) => response.json())
    .then((data) => {
      const toilets = data.map((toilet) => ({
        id: toilet.googlePlaceId,
        position: { lat: toilet.latitude, lng: toilet.longitude },
        name: toilet.name,
        type: toilet.type,
        address: toilet.address,
        rating: toilet.rating,
        ratingCount: toilet.ratingCount,
        distance: toilet.distance,
      }));
      return toilets;
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const fetchWithinBox = async (
  currentPosition,
  lowerLeftCoords,
  upperRightCoords
) => {
  console.log("fetchWithinBox called");
  console.log("currentPosition : " + currentPosition);
  console.log("lower coords : " + lowerLeftCoords);
  console.log("upper coords : " + JSON.stringify(upperRightCoords));
  return fetch(
    `https://${process.env.BACK_END_API_DOMAIN}:${
      process.env.BACK_END_API_PORT
    }${process.env.BACK_END_API_WITHIN_BOX_GET_URI}?currentPositionLatitude=${
      currentPosition.lat
    }&currentPositionLongitude=${
      currentPosition.lng
    }&lowerLeftLatitude=${lowerLeftCoords.lat()}&lowerLeftLongitude=${lowerLeftCoords.lng()}&upperRightLatitude=${upperRightCoords.lat()}&upperRightLongitude=${upperRightCoords.lng()}`
  )
    .then((response) => response.json())
    .then((data) => {
      const toilets = data.map((toilet) => ({
        id: toilet.id,
        googlePlaceId: toilet.googlePlaceId,
        position: { lat: toilet.latitude, lng: toilet.longitude },
        name: toilet.name,
        type: toilet.type,
        address: toilet.address,
        rating: toilet.rating,
        ratingCount: toilet.ratingCount,
        distance: toilet.distance,
      }));
      return toilets;
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const fetchDetails = async (currentPosition, googlePlaceId, type) => {
  console.log("fetchDetails called");
  console.log("currentPosition : " + currentPosition);
  console.log("toilet type : " + type);
  // if type is public_bathroom, we need to fetch with google maps reviews and photos
  let isFetchWithGoogleMapsReviews = type === "public_bathroom" ? true : false;
  return fetch(
    `https://${process.env.BACK_END_API_DOMAIN}:${process.env.BACK_END_API_PORT}${process.env.BACK_END_API_DETAILS_GET_URI}/${googlePlaceId}?currentPositionLatitude=${currentPosition.lat}&currentPositionLongitude=${currentPosition.lng}&isFetchWithGoogleMapsReviews=${isFetchWithGoogleMapsReviews}`
  )
    .then((response) => response.json())
    .then((data) => {
      const toilet = {
        id: data.id,
        googlePlaceId: data.googlePlaceId,
        position: { lat: data.latitude, lng: data.longitude },
        name: data.name,
        type: data.type,
        address: data.address,
        rating: data.rating,
        ratingCount: data.ratingCount,
        distance: data.distance,
        reviews: data.reviews,
        photos: data.photos,
        googleMapsPhotos: data.googleMapsPhotos,
      };
      return toilet;
    })
    .catch((error) => console.error("Error fetching data:", error));
};

export { fetchNearby, fetchWithinBox, fetchDetails };
