import React, { useEffect, useRef } from "react";
import "../QuestionAnswers.scss";

function BooleanSelect(props) {
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
