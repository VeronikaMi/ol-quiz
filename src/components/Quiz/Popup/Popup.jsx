import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Quiz.scss";

import { formateDate } from "../../../utils";

function Popup(props) {
  let navigate = useNavigate();
  const popup = useRef();

  const saveToLocalStorage = () => {
    let history = [];
    let date = new Date();
    let currentRecord = {
      score: props.score,
      time: formateDate(date),
      timeForCompare: date.getTime(),
    };

    if (!localStorage.getItem("history")) {
      history.push({ ...currentRecord, id: history.length + 1 });
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      history = [...JSON.parse(localStorage.getItem("history"))];
      history.push({ ...currentRecord, id: history.length + 1 });
      localStorage.setItem("history", JSON.stringify(history));
    }

    navigate("/");
  };

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
            <button className="btn-main" onClick={saveToLocalStorage}>
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
