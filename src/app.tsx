import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import Map from "./components/Map/Map";
import ToiletResultPanel from "./components/ToiletResultPanel/ToiletResultPanel";

import "./style.css";

const App = () => {
  const [markers, setMarkers] = useState([]);

  const hasMarkers = markers != null && markers.length != 0;
  return (
    <div>
      <div className="map">
        <Map markers={markers} setMarkers={setMarkers} />
      </div>
      {hasMarkers ? <ToiletResultPanel markers={markers} /> : ""}
    </div>
  );
};

export default App;

const root = createRoot(document.getElementById("app"));
root.render(<App />);
