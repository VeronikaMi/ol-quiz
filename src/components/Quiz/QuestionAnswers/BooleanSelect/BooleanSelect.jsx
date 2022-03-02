import React, { useEffect, useRef } from "react";
import "../QuestionAnswers.scss";

import {
  manageSelectedAnswerAndDisabledButtons,
  manageSingleSelect,
} from "../../../../utils";

function BooleanSelect(props) {
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
        <button
          id="true"
          type="button"
          className="btn-answer"
          onClick={handleClick}
        >
          True
        </button>
        <button
          id="false"
          type="button"
          className="btn-answer"
          onClick={handleClick}
        >
          False
        </button>
      </div>
    </div>
  );
}

export default BooleanSelect;
