import React from "react";
import "./HistoryRecord.scss";

function HistoryRecord({ record, onRightClick }) {
  return (
    <div className="record" onContextMenu={onRightClick}>
      <p>
        <span className="category"> Score:</span> {record.score}
      </p>
      <p>
        <span className="category"> Time:</span> {record.time}
      </p>
    </div>
  );
}

export default HistoryRecord;
