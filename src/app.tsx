import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

import Map from "./components/Map";
import ToiletResult from './components/ToiletResult';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const handleSidePanelToggle = () => setIsSidePanelOpen(!isSidePanelOpen);

    const hasMarkers = markers != null && markers.length != 0;
    return (
      <div>
          <div className="map">
            <Map markers={markers} setMarkers={setMarkers}/>
          </div>
          {hasMarkers ? (
          <div>
            <div className={`sidepanel ${isSidePanelOpen ? "sidepanel--open" : ""}`}>
              <ToiletResult markers={markers} />
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
};

export default App;

const root = createRoot(document.getElementById('app'));
root.render(
      <App />
);

