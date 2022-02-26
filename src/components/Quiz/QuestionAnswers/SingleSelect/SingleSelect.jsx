import React, { useEffect, useRef } from "react";
import "../QuestionAnswers.scss";

function SingleSelect(props) {
  const btns = useRef();

  const handleClick = (e) => {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    }

    btns.current.childNodes.forEach((btn) => {
      if (btn.id !== e.target.id && btn.classList.contains("selected"))
        btn.classList.remove("selected");
    });

    props.onSelectAnswer(e.target.id);
  };

  useEffect(() => {
    btns.current.childNodes.forEach((btn) => {
      if (btn.classList.contains("selected")) {
        btn.classList.add(`${props.answerStatus}`);
      }
      if (props.answerStatus) {
        btn.disabled = true;
      }
    });
  }, [props.answerStatus]);

  return (
    <div className="continer">
      <div className="question">{props.question}</div>
      <div className="answers" ref={btns}>
        {props.answers.length > 0 &&
          props.answers.map((answer, index) => (
            <button
              key={`${index}`}
              id={index + 1}
              type="button"
              className="btn-answer"
              onClick={handleClick}
            >
              {answer}
            </button>
          ))}
      </div>
    </div>
  );
}

export default SingleSelect;
