import React, { useState } from "react";

import ToiletResult from "../ToiletResult/ToiletResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import "./ToiletResultPanel.css";

const ToiletResultPanel = (props) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const handleSidePanelToggle = () => setIsSidePanelOpen(!isSidePanelOpen);
  return (
    <>
      <div className={`sidepanel ${isSidePanelOpen ? "sidepanel--open" : ""}`}>
        <ToiletResult
          markers={props.markers}
          selectedMarkerId={props.selectedMarkerId}
        />
      </div>
      <div
        className={`sidepanel-toggle-btn ${
          isSidePanelOpen ? "sidepanel-toggle-btn--open" : ""
        }`}
        onClick={handleSidePanelToggle}
      >
        <div className={"toggle-icon-container"}>
          <FontAwesomeIcon
            className={"toggle-icon"}
            icon={isSidePanelOpen ? faCaretLeft : faCaretRight}
          />
        </div>
      </div>
    </>
  );
};

export default ToiletResultPanel;
