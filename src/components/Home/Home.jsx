import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecord, setHistoryRecord] = useState({});

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setShowHistory(true);
      let history = JSON.parse(localStorage.getItem("history"));
      setHistoryRecord(history[history.length - 1]);
    }
  }, []);

  return (
    <div className="home">
      <div className="container">
        <Link to="/quiz">
          <button type="button" className="btn-main">
            Start Quiz
          </button>
        </Link>
      </div>
      {showHistory && (
        <div className="history-container">
          <h3>Last game result:</h3>
          <p>
            {historyRecord.score} | {historyRecord.time}
          </p>
          <Link to="/history">
            <button type="button" className="btn-secondary">
              See Full History
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
