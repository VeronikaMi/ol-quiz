import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mySort } from "../../utils";
import "./Home.scss";

function Home() {
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecord, setHistoryRecord] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("history") &&
      localStorage.getItem("history") !== "[]"
    ) {
      let history = JSON.parse(localStorage.getItem("history"));
      let sortedHistory = history.sort((a, b) =>
        mySort(a.timeForCompare, b.timeForCompare)
      );
      setHistoryRecord(sortedHistory[0]);
      setShowHistory(true);
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
