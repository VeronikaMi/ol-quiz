import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { sortHistory } from "../../utils";
import ContextMenu from "./ContextMenu/ContextMenu";
import "./History.scss";
import HistoryRecord from "./HistoryRecord/HistoryRecord";

function History() {
  const menu = useRef();
  const [history, setHistory] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      let records = JSON.parse(localStorage.getItem("history"));
      sortHistory(records);
      setHistory(records);
    }
  }, []);

  const handleRightClick = (e, record) => {
    e.preventDefault();
    setShowMenu(true);
    setIdToDelete(record.id);
    setTop(e.clientY);
    setLeft(e.clientX);
  };

  const handleDelete = (_) => {
    setHistory((prev) => [
      ...prev.filter((record) => record.id !== idToDelete),
    ]);
    setShowMenu(false);
  };

  const handleClick = (e) => {
    if (showMenu && !menu.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <div className="history" onClick={handleClick}>
      {showMenu && (
        <ContextMenu
          handleDelete={handleDelete}
          ref={menu}
          position={{ top, left }}
        />
      )}

      <div className="container">
        <h1>History:</h1>
        {history.length > 0 ? (
          history.map((record, index) => (
            <HistoryRecord
              key={index}
              record={record}
              onRightClick={(e) => handleRightClick(e, record)}
            />
          ))
        ) : (
          <h3>No records</h3>
        )}

        <div className="btn-container">
          <Link to="/">
            <button>Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default History;
