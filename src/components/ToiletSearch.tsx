import React, { useState, useEffect } from 'react';
import fetchNearby from '../services/ToiletSearchService';

const ToiletSearch = ({currentPosition, markers, setMarkers}) => {
  const [radius, setRadius] = useState(2);

  const handleSearch = async () => {
    const results = await fetchNearby(currentPosition, radius);
    console.log(JSON.stringify(results));
    setMarkers(results);
  };

  return (
    <div>
      <h1>Search Toilets Within Radius</h1>
      <div>
        <label>
          Latitude: {currentPosition.latitude}
        </label>
      </div>
      <div>
        <label>
          Longitude: {currentPosition.longitude}
        </label>
      </div>
      <div>
        <label>
          Radius (km):
          <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Results:</h2>
        <ul>
          {markers?.map((toilet) => (
            <li key={toilet.id}>
              {toilet.name} - {toilet.distance}km
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToiletSearch;