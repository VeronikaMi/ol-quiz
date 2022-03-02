import React from "react";

import "./QuestionAnswers.scss";

import BooleanSelect from "./BooleanSelect/BooleanSelect";
import SingleSelect from "./SingleSelect/SingleSelect";
import MultipleSelect from "./MultipleSelect/MultipleSelect";

function QuestionAnswers({
  question,
  answers,
  handleSelect,
  answerStatus,
  type,
}) {
  let questionProps = {
    question,
    answers,
    onSelectAnswer: handleSelect,
    answerStatus,
  };

  return (
    <div className="qa-container">
      {type === "boolean" && <BooleanSelect {...questionProps} />}
      {type === "single" && <SingleSelect {...questionProps} />}
      {type === "multiple" && <MultipleSelect {...questionProps} />}
    </div>
  );
}

export default QuestionAnswers;
