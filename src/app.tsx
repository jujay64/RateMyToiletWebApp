import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "./components/CustomMap/CustomMap";
import ToiletResultPanel from "./components/ToiletResultPanel/ToiletResultPanel";

import "./style.css";

const App = () => {
  const [markers, setMarkers] = useState([]);

  const hasMarkers = markers != null && markers.length != 0;
  return (
    <div>
      <div className="map">
        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
          <CustomMap markers={markers} setMarkers={setMarkers} />
        </APIProvider>
      </div>
      {hasMarkers && <ToiletResultPanel markers={markers} />}
    </div>
  );
};

export default App;

const root = createRoot(document.getElementById("app"));
root.render(<App />);
