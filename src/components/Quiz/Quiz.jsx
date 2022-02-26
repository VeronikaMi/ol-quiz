import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Quiz.scss";

import { API as url } from "../../utils";

import QuestionAnswers from "./QuestionAnswers/QuestionAnswers";
import ClipLoader from "react-spinners/ClipLoader";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [choiceStatus, setChoiceStatus] = useState("");
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  const popup = useRef();

  let navigate = useNavigate();

  let barUnit = (1 / questions.length) * 100;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setAnswers(data.answers);
        setIsLoading(false);
        // manageLocalStorage(data);
      });
  }, []);

  // const manageLocalStorage = (data) => {
  //   localStorage.setItem("questions", JSON.stringify(data));
  //   setTimeout(() => {
  //     localStorage.removeItem("questions");
  //   }, 600000);
  // };

  const handleCheck = () => {
    if (selectedAnswer && selectedAnswer.length !== 0) {
      let isCorrect = false;
      if (questions[questionIndex].type !== "multiple") {
        if (answers[questionIndex].answer == JSON.parse(selectedAnswer)) {
          isCorrect = true;
        }
      } else {
        if (
          answers[questionIndex].answer.length === selectedAnswer.length &&
          JSON.stringify(answers[questionIndex].answer.sort()) ===
            JSON.stringify(selectedAnswer.sort())
        ) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        setChoiceStatus("correct");
        setScore((prev) => prev + 1);
      } else {
        setChoiceStatus("incorrect");
      }

      setIsChecked(true);
    }
  };

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setBarWidth((prev) => prev + barUnit);
    setChoiceStatus("");
    setIsChecked(false);
    setSelectedAnswer(null);
  };

  const handlePopupClick = (e) => {
    if (!popup.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  const formateDate = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}  ${String(date.getUTCDate()).padStart(
      2,
      "0"
    )} / ${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )} / ${date.getFullYear()}`;
  };

  const saveToLocalStorage = () => {
    let history = [];
    let date = new Date();
    let currentRecord = {
      score: score,
      time: formateDate(date),
      timeForCompare: date.getTime(),
    };

    if (!localStorage.getItem("history")) {
      history.push({ ...currentRecord, id: history.length + 1 });
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      history = [...JSON.parse(localStorage.getItem("history"))];
      history.push({ ...currentRecord, id: history.length + 1 });
      localStorage.setItem("history", JSON.stringify(history));
    }

    navigate("/");
  };

  return (
    <div className="quiz">
      {showPopup && (
        <div className="popup-overlay" onClick={handlePopupClick}>
          <div className="popup" ref={popup}>
            <button className="btn-close" onClick={() => setShowPopup(false)}>
              X
            </button>
            <div className="content">
              <h3>Do you want to save this attempt?</h3>
              <div className="btn-popup">
                <button className="btn-main" onClick={saveToLocalStorage}>
                  Yes
                </button>
                <Link to="/">
                  <button className="btn-main">No</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <ClipLoader loading={isLoading} size={60} color={"#4ab5cd"} />
        {questions.length > 0 && questionIndex !== questions.length && (
          <div className="question-container">
            <div className="progress-bar">
              <div className="answered" style={{ width: `${barWidth}%` }}></div>
            </div>
            <QuestionAnswers
              type={questions[questionIndex].type}
              question={questions[questionIndex].question}
              answers={questions[questionIndex].options}
              handleSelect={(answer) => setSelectedAnswer(answer)}
              answerStatus={choiceStatus}
            />
            <div className="btn-container">
              <button
                className="btn-main"
                onClick={handleCheck}
                disabled={isChecked}
              >
                Check
              </button>
              <button
                className="btn-main"
                onClick={handleNext}
                disabled={!isChecked}
              >
                {questionIndex !== questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        )}
        {questions.length > 0 && questionIndex === questions.length && (
          <div className="score">
            <h1>Your Score:</h1>
            <h1>
              {score} / {questions.length}
            </h1>
            <div className="btns">
              <button
                type="button"
                className="btn-main"
                onClick={() => setShowPopup(true)}
              >
                Try Again
              </button>
              <Link to="/history">
                <button type="button" className="btn-main">
                  See history
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
