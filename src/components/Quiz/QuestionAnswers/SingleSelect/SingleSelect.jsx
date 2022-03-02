import React, { useEffect, useRef } from "react";
import "../QuestionAnswers.scss";

import {
  manageSelectedAnswerAndDisabledButtons,
  manageSingleSelect,
} from "../../../../utils";

function SingleSelect(props) {
  const btns = useRef();

  const handleClick = (e) => {
    manageSingleSelect(e, btns);
    props.onSelectAnswer(e.target.id);
  };

  useEffect(() => {
    manageSelectedAnswerAndDisabledButtons(btns, props.answerStatus);
  }, [props.answerStatus]);

  return (
    <div className="container-qa">
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
