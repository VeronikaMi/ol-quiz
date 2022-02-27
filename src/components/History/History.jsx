import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { mySort } from "../../utils";
import "./History.scss";

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
      records.sort((a, b) => {
        if (b.score === a.score) {
          return mySort(a.timeForCompare, b.timeForCompare);
        } else {
          return b.score - a.score;
        }
      });
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

  const handleDelete = (e) => {
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
        <div className="menu" style={{ top: top, left: left }} ref={menu}>
          <ul>
            <li onClick={handleDelete}>Delete</li>
          </ul>
        </div>
      )}

      <div className="container">
        <h1>History:</h1>
        {history.length > 0 ? (
          history.map((record, index) => (
            <div
              className="record"
              key={index}
              onContextMenu={(e) => handleRightClick(e, record)}
            >
              <p>
                <span className="category"> Score:</span> {record.score}
              </p>
              <p>
                <span className="category"> Time:</span> {record.time}
              </p>
            </div>
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
