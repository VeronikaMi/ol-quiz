import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Link to="/quiz">
          <button type="button" className="btn-main">
            Start Quiz
          </button>
        </Link>
      </div>
      <div className="history-container">
        <h3>Last game result:</h3>
        <p>score | date</p>
        <Link to="/history">
          <button type="button" className="btn-secondary">
            See Full History
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
