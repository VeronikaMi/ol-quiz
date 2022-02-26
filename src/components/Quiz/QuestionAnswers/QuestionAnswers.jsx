import React from "react";
import "./QuestionAnswers.scss";
import BooleanSelect from "./BooleanSelect/BooleanSelect";
import SingleSelect from "./SingleSelect/SingleSelect";
import MultipleSelect from "./MultipleSelect/MultipleSelect";

function QuestionAnswers(props) {
  return (
    <div className="qa-container">
      {props.type === "boolean" && (
        <BooleanSelect
          question={props.question}
          answers={props.answers}
          onSelectAnswer={props.handleSelect}
          answerStatus={props.answerStatus}
        />
      )}
      {props.type === "single" && (
        <SingleSelect
          question={props.question}
          answers={props.answers}
          onSelectAnswer={props.handleSelect}
          answerStatus={props.answerStatus}
        />
      )}
      {props.type === "multiple" && (
        <MultipleSelect
          question={props.question}
          answers={props.answers}
          onSelectAnswer={props.handleSelect}
          answerStatus={props.answerStatus}
        />
      )}
    </div>
  );
}

export default QuestionAnswers;
