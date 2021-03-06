import React, { forwardRef } from "react";
import "./ContextMenu.scss";

const ContextMenu = forwardRef(({ handleDelete, position }, ref) => {
  let { top, left } = position;
  return (
    <div className="menu" style={{ top, left }} ref={ref}>
      <ul>
        <li onClick={handleDelete}>Delete</li>
      </ul>
    </div>
  );
});

export default ContextMenu;
