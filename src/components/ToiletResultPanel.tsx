import React, { useState } from "react";

import ToiletResult from "./ToiletResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const ToiletResultPanel = ({ markers }) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const handleSidePanelToggle = () => setIsSidePanelOpen(!isSidePanelOpen);
  return (
    <div>
      <div className={`sidepanel ${isSidePanelOpen ? "sidepanel--open" : ""}`}>
        <ToiletResult markers={markers} />
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
    </div>
  );
};

export default ToiletResultPanel;
