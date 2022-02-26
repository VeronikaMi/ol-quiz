import React from "react";
import { Link } from "react-router-dom";

import "./History.scss";

function History() {
  return (
    <div className="history">
      <div className="container">
        <h1>History:</h1>
        <div className="record">
          <p>score | date</p>
        </div>
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
