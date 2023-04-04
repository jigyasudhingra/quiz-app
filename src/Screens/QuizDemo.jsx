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
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    description: "",
    duration: "",
  });

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
    const updatedQuestions = [
      ...questions.slice(0, index),
      ...questions.slice(index + 1),
    ];
    setQuestions(updatedQuestions);
  };

  const refactorQuiz = () => {
    // Remove empty options, wherever in quiz
    for (
      let questionIndex = 0;
      questionIndex < questions.length;
      questionIndex++
    ) {
      const question = questions[questionIndex].options;
      for (let optionIndex = 0; optionIndex < question.length; optionIndex++) {
        const option = question[optionIndex];
        if (option.optionStatement === "") {
          const updatedQuestionOptions = [
            ...questions[questionIndex].options.slice(0, optionIndex),
            ...questions[questionIndex].options.slice(optionIndex + 1),
          ];
          let updatedQuestions = [...questions];
          updatedQuestions[questionIndex].options = [...updatedQuestionOptions];
          setQuestions(updatedQuestions);
        }
      }
    }
  };

  const saveQuiz = () => {
    refactorQuiz();
    const finalQuiz = { ...quizDetails, questions: [...questions] };
    console.log(finalQuiz);
  };

  return (
    <div>
      <input
        type="text"
        required
        value={quizDetails.name}
        onChange={(e) => {
          setQuizDetails({ ...quizDetails, name: e.target.value });
        }}
      />
      <input
        type="text"
        required
        value={quizDetails.description}
        onChange={(e) => {
          setQuizDetails({ ...quizDetails, description: e.target.value });
        }}
      />
      <input
        required
        type="number"
        value={quizDetails.duration}
        onChange={(e) => {
          setQuizDetails({
            ...quizDetails,
            duration: parseInt(e.target.value),
          });
        }}
      />
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
            required
            value={question.statement}
            onChange={(e) => {
              updateQuestionStatement(e, index);
            }}
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
      <button onClick={() => saveQuiz()}>Save quiz</button>
      <button onClick={() => {}}>Delete quiz</button>
    </div>
  );
};

export default QuizDemo;
