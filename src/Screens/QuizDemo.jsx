import React, { useState } from "react";

const demoQuestions = [
  {
    statement: "refg wergertgte wettgetg rtwgrtg",
    options: [
      {
        optionStatement: "gtregrt",
        correct: false,
      },
      {
        optionStatement: "fregt",
        correct: true,
      },
      {
        optionStatement: "fsbhhh",
        correct: false,
      },
    ],
  },
];

const QuizDemo = () => {
  const [questions, setQuestions] = useState(demoQuestions);

  const updateQuestionStatement = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].statement = e.target.value;
    setQuestions(updatedQuestions);
  };

  const updateQuestionOption = (e, index, idx) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[idx].optionStatement = e.target.value;
    setQuestions(updatedQuestions);
  };

  const addNewOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({
      optionStatement: "",
      correct: false,
    });
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.push({
      statement: "",
      options: [],
    });
    setQuestions(updatedQuestions);
  };

  const makeCorrectHandler = (index, idx) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[idx].correct =
      !updatedQuestions[index].options[idx].correct;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    let updatedQuestions = [
      ...questions.slice(0, index),
      ...questions.slice(index + 1),
    ];
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      {questions?.map((question, index) => (
        <div
          key={question + index}
          style={{
            margin: 10,
          }}
        >
          {index}
          <input
            style={{
              margin: 5,
              padding: 5,
            }}
            value={question.statement}
            onChange={(e) => updateQuestionStatement(e, index)}
          />
          <span
            style={{
              fontSize: 25,
            }}
            onClick={() => deleteQuestion(index)}
          >
            ␡
          </span>
          <div>
            {question?.options?.map((option, idx) => (
              <div
                key={index + idx + option}
                style={{
                  marginLeft: 20,
                }}
              >
                <input
                  style={{
                    margin: 5,
                    padding: 5,
                    border: option.correct
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                  value={option.optionStatement}
                  onChange={(e) => updateQuestionOption(e, index, idx)}
                />
                <span onClick={() => makeCorrectHandler(index, idx)}>
                  make it
                  {!option.correct ? " correct" : " incorrect"}
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => addNewOption(index)}>Add new option</button>
        </div>
      ))}
      <button onClick={() => addNewQuestion()}>Add new question</button>
      <button onClick={() => {}}>Save quiz</button>
      <button onClick={() => {}}>Delete quiz</button>
    </div>
  );
};

export default QuizDemo;
