import React, { useState } from "react";

import ToiletResult from "../ToiletResult/ToiletResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import "./ToiletResultPanel.css";
import ToiletDetail from "../ToiletDetail/ToiletDetail";

const ToiletResultPanel = (props) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const handleSidePanelToggle = () => setIsSidePanelOpen(!isSidePanelOpen);

  const hasDetails =
    props.toiletDetails && Object.keys(props.toiletDetails).length > 0;
  return (
    <>
      <div className={`sidepanel ${isSidePanelOpen ? "sidepanel--open" : ""}`}>
        <ToiletResult
          markers={props.markers}
          selectedMarkerId={props.selectedMarkerId}
          hoverMarkerId={props.hoverMarkerId}
          setSelectedMarkerId={props.setSelectedMarkerId}
          setHoverMarkerId={props.setHoverMarkerId}
        />
      </div>
      {hasDetails && (
        <ToiletDetail
          toiletDetails={props.toiletDetails}
          setSelectedMarkerId={props.setSelectedMarkerId}
          setToiletDetails={props.setToiletDetails}
        />
      )}
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
