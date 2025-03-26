/**
 * Copyright 2024 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

import Map from "./components/Map";
import ToiletSearch from './components/ToiletSearch';
import fetchNearby from './services/ToiletSearchService';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const App = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [markers, setMarkers] = useState([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = await position.coords.latitude;
        const longitude = await position.coords.longitude;
        setCurrentLocation({latitude, longitude});
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getInitialData = async (location) => {
    const results = await fetchNearby(location, 2);
    console.log('results : ' + JSON.stringify(results));
    setMarkers(results);
  };

  useEffect(() => {
    if(currentLocation.latitude && currentLocation.latitude){
      getInitialData(currentLocation);
    }
  }, [currentLocation]);

  const handleSidePanelToggle = () => setIsSidePanelOpen(!isSidePanelOpen);


  console.log(JSON.stringify(currentLocation));
  if(currentLocation && currentLocation.latitude && currentLocation.longitude){
    const hasMarkers = markers != null && markers.length != 0;
    console.log('Render map!');
    return (
      <div>
          <div className="map">
            <Map currentPosition={currentLocation} markers={markers}/>
          </div>
          {hasMarkers ? (
          <div>
            <div className={`sidepanel ${isSidePanelOpen ? "sidepanel--open" : ""}`}>
              <ToiletSearch currentPosition={currentLocation} markers={markers} setMarkers={setMarkers}/>
            </div>
            <div className={`sidepanel-toggle-btn ${isSidePanelOpen ? "sidepanel-toggle-btn--open" : ""}`} onClick={handleSidePanelToggle}>
              <div className={"toggle-icon-container"}>
                <FontAwesomeIcon className={"toggle-icon"} icon={isSidePanelOpen ? faCaretLeft : faCaretRight} />
              </div>
            </div>
          </div>
          ):("")}
      </div>
    );
  }
};

export default App;

const root = createRoot(document.getElementById('app'));
root.render(
      <App />
);

