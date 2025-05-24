import React, { useState } from "react";

import ToiletResultList from "../ToiletResultList/ToiletResultList";
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
      <div className={`result-list ${isSidePanelOpen ? "result-list--open" : ""}`}>
        <ToiletResultList
          markers={props.markers}
          selectedMarkerId={props.selectedMarkerId}
          hoverMarkerId={props.hoverMarkerId}
          setSelectedMarkerId={props.setSelectedMarkerId}
          setHoverMarkerId={props.setHoverMarkerId}
        />
      </div>
      {hasDetails && (
        <div className={`detail ${isSidePanelOpen ? "detail--open" : ""}`}>
          <ToiletDetail
            toiletDetails={props.toiletDetails}
            setSelectedMarkerId={props.setSelectedMarkerId}
            setToiletDetails={props.setToiletDetails}
          />
        </div>
      )}
      <div
        className={`sidepanel-toggle-btn ${
          isSidePanelOpen && hasDetails ? "sidepanel-toggle-btn--open-with-detail" : isSidePanelOpen ? "sidepanel-toggle-btn--open" : ""
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
