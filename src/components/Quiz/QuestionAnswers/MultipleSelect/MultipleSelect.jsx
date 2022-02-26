import React, { useEffect, useRef, useState } from "react";
import "../QuestionAnswers.scss";

function MultipleSelect(props) {
  const btns = useRef();
  const [choices, setChoices] = useState([]);

  const handleClick = (e) => {
    let id = JSON.parse(e.target.id);
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      setChoices(choices.filter((id) => id !== id));
    } else {
      e.target.classList.add("selected");
      setChoices([...choices, id]);
    }
  };

  useEffect(() => props.onSelectAnswer(choices), [choices]);

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

export default MultipleSelect;