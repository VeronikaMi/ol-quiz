import React, { useEffect, useRef, useState } from "react";
import "../QuestionAnswers.scss";

import { manageSelectedAnswerAndDisabledButtons } from "../../../../utils";

function MultipleSelect(props) {
  const buttons = useRef();
  const [choices, setChoices] = useState([]);

  const handleClick = (e) => {
    let id = JSON.parse(e.target.id);
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      setChoices(choices.filter((choiceId) => choiceId !== id));
    } else {
      e.target.classList.add("selected");
      setChoices([...choices, id]);
    }
  };

  useEffect(
    () => props.onSelectAnswer(choices),
    [choices, props.onSelectAnswer]
  );

  useEffect(() => {
    manageSelectedAnswerAndDisabledButtons(buttons, props.answerStatus);
  }, [props.answerStatus]);

  return (
    <div className="container-qa">
      <div className="question">{props.question}</div>
      <div className="answers" ref={buttons}>
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
