const fetchNearby = async (currentPosition, radius) => {
    console.log('fetchNearby called');
    console.log(JSON.stringify(currentPosition));
    return fetch(`https://${process.env.BACK_END_API_DOMAIN}:${process.env.BACK_END_API_PORT}${process.env.BACK_END_API_NEARBY_GET_URI}?latitude=${currentPosition.latitude}&longitude=${currentPosition.longitude}&radiusInKm=${radius}`)
      .then(response => response.json())
      .then(data => {
        const toilets = data.map(toilet => ({
          id: toilet.googlePlaceId,
          position: { lat: toilet.latitude, lng: toilet.longitude },
          name: toilet.name,
          distance: toilet.distance
        }));
        return toilets;
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  export default fetchNearby;