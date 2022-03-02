import React from "react";
import "./ContextMenu.scss";

function ContextMenu({ handleDelete, position }) {
  let [top, left] = position;
  return (
    <div className="menu" style={{ top, left }}>
      <ul>
        <li onClick={handleDelete}>Delete</li>
      </ul>
    </div>
  );
}

export default ContextMenu;
