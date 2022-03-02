import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "../Quiz.scss";

import { saveToLocalStorage } from "../../../utils";

function Popup(props) {
  const popup = useRef();

  const handlePopupClick = (e) => {
    if (!popup.current.contains(e.target)) {
      props.onShowPopup(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={handlePopupClick}>
      <div className="popup" ref={popup}>
        <button className="btn-close" onClick={() => props.onShowPopup(false)}>
          X
        </button>
        <div className="content">
          <h3>Do you want to save this attempt?</h3>
          <div className="btn-popup">
            <button
              className="btn-main"
              onClick={() => {
                saveToLocalStorage(props.score);
                props.navigateHome();
              }}
            >
              Yes
            </button>
            <Link to="/">
              <button className="btn-main">No</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
