import React from "react";
import "./ProgressBar.scss";

function ProgressBar({ barWidth }) {
  return (
    <div className="progress-bar">
      <div className="answered" style={{ width: `${barWidth}%` }}></div>
    </div>
  );
}

export default ProgressBar;
