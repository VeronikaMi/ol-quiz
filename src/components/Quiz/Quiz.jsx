import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Quiz.scss";

import {
  API as url,
  saveToLocalStorageAndDeleteAfter10Min,
  saveToLocalStorage,
} from "../../utils";

import QuestionAnswers from "./QuestionAnswers/QuestionAnswers";
import ClipLoader from "react-spinners/ClipLoader";
import Popup from "./Popup/Popup";
import ProgressBar from "./ProgressBar/ProgressBar";

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

  let navigate = useNavigate();
  let barUnit = (1 / questions.length) * 100;

  useEffect(() => {
    if (!localStorage.getItem("questions")) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions);
          setAnswers(data.answers);
          setIsLoading(false);
          saveToLocalStorageAndDeleteAfter10Min(data);
        });
    } else {
      let data = JSON.parse(localStorage.getItem("questions"));
      setQuestions(data.questions);
      setAnswers(data.answers);
      setIsLoading(false);
    }
  }, []);

  const handleCheck = () => {
    if (selectedAnswer && selectedAnswer.length !== 0) {
      let isCorrect = false;
      if (questions[questionIndex].type !== "multiple") {
        if (answers[questionIndex].answer === JSON.parse(selectedAnswer)) {
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

  return (
    <div className="quiz">
      {showPopup && (
        <Popup
          score={score}
          onShowPopup={(show) => setShowPopup(show)}
          navigateHome={() => navigate("/")}
        />
      )}
      <div className="container">
        <ClipLoader loading={isLoading} size={60} color={"#4ab5cd"} />
        {questions.length > 0 && questionIndex !== questions.length && (
          <div className="question-container">
            <ProgressBar barWidth={barWidth} />
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
                <button
                  type="button"
                  className="btn-main"
                  onClick={() => saveToLocalStorage(score)}
                >
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
