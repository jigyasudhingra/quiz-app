import React, { useEffect, useState } from "react";
import {
  addNewQuiz,
  deleteQuizDetails,
  editQuizDetails,
  getQuizDetails,
} from "../fireabse-config";
import { useParams } from "react-router-dom";

const QuizDemo = () => {
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    description: "",
    duration: 0,
  });

  const quizId = useParams().id;
  const getQuiz = async () => {
    const quiz = await getQuizDetails(quizId);
    setQuizDetails({
      name: quiz.name,
      description: quiz.description,
      duration: quiz.duration,
    });
    setQuestions(quiz.questions);
  };

  useEffect(() => {
    if (quizId !== undefined) {
      getQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestionOptions = [
      ...questions[questionIndex].options.slice(0, optionIndex),
      ...questions[questionIndex].options.slice(optionIndex + 1),
    ];
    let updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = [...updatedQuestionOptions];
    setQuestions(updatedQuestions);
  };

  const saveQuiz = async () => {
    if (quizDetails.name === "") {
      alert("Please enter name");
      return;
    }

    if (quizDetails.description === "") {
      alert("Please enter description");
      return;
    }

    if (quizDetails.duration === 0) {
      alert("Please enter duration");
      return;
    }

    if (questions.length < 1) {
      alert("Please enter atleast one question");
      return;
    }

    refactorQuiz();
    const finalQuiz = { ...quizDetails, questions: [...questions] };
    if (quizId !== undefined) {
      await editQuizDetails(quizId, finalQuiz);
      alert("Quiz details updated");
      window.location.href = "/";
    } else {
      await addNewQuiz(finalQuiz);
      setQuizDetails({
        name: "",
        description: "",
        duration: 0,
      });
      setQuestions([]);
      window.location.href = "/";
    }
  };

  const deleteQuiz = async () => {
    await deleteQuizDetails(quizId);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        padding: "1% 20%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            marginLeft: 10,
          }}
        >
          Name
        </div>
        <input
          style={{
            borderRadius: 20,
            backgroundColor: "#e7ddfe",
            border: "none",
            padding: 15,
            width: 500,
            color: "#36007b",
            fontFamily: "Garet book",
            fontSize: 11,
            letterSpacing: 0.3,
          }}
          type="text"
          required
          value={quizDetails.name}
          onChange={(e) => {
            setQuizDetails({ ...quizDetails, name: e.target.value });
          }}
        />

        <div
          style={{
            marginLeft: 10,
          }}
        >
          Description
        </div>
        <textarea
          style={{
            borderRadius: 20,
            backgroundColor: "#e7ddfe",
            border: "none",
            padding: 15,
            color: "#36007b",
            width: 500,
            fontFamily: "Garet book",
            fontSize: 11,
            letterSpacing: 0.3,
          }}
          rows={4}
          type="text"
          required
          value={quizDetails.description}
          onChange={(e) => {
            setQuizDetails({ ...quizDetails, description: e.target.value });
          }}
        />
        <div
          style={{
            marginLeft: 10,
          }}
        >
          Duration (in minutes)
        </div>
        <input
          style={{
            borderRadius: 20,
            backgroundColor: "#e7ddfe",
            border: "none",
            padding: 15,
            width: 500,
            color: "#36007b",
            fontFamily: "Garet book",
            fontSize: 11,
            letterSpacing: 0.3,
          }}
          required
          type="number"
          value={quizDetails.duration}
          onChange={(e) => {
            setQuizDetails({
              ...quizDetails,
              duration: e.target.value,
            });
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "Garet Heavy",
          fontSize: 16,
          letterSpacing: 0.2,
          color: "#752899",
          paddingTop: 50,
          marginLeft: 10,
        }}
      >
        QUESTIONS
      </div>
      {questions?.map((question, index) => (
        <div key={question + index}>
          <div
            style={{
              width: 500,
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            <b>Ques. {index + 1}</b>
            <span
              style={{
                fontSize: 10,
                letterSpacing: 0.4,
                color: "red",
                marginLeft: 10,
              }}
              onClick={() => deleteQuestion(index)}
            >
              DEL
            </span>
          </div>

          <input
            style={{
              borderRadius: 20,
              backgroundColor: "#e7ddfe",
              border: "none",
              padding: 15,
              width: 500,
              color: "#36007b",
              fontFamily: "Garet book",
              fontSize: 11,
              letterSpacing: 0.3,
            }}
            required
            value={question.statement}
            onChange={(e) => {
              updateQuestionStatement(e, index);
            }}
          />

          <div
            style={{
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            {question?.options?.map((option, idx) => (
              <>
                <div
                  key={index + idx + option}
                  style={{
                    width: 490,
                    padding: 10,
                    borderRadius: 20,
                    border: option.correct ? "#ddfee7" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      Option {idx + 1}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          color: "red",
                        }}
                        onClick={() => makeCorrectHandler(index, idx)}
                      >
                        make it
                        {!option.correct ? " correct" : " incorrect"}
                      </span>

                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: 0.4,
                          color: "red",
                          paddingLeft: 30,
                        }}
                        onClick={() => deleteOption(index, idx)}
                      >
                        DEL
                      </span>
                    </div>
                  </div>
                  <textarea
                    cols={3}
                    style={{
                      margin: 5,
                      padding: 20,
                      borderRadius: 20,
                      border: "none",
                      width: 460,
                      fontFamily: "Garet book",
                      fontSize: 11,
                      letterSpacing: 0.3,
                      color: "#36007B",
                      backgroundColor: option.correct ? "#ddfee7" : "#f7f0f6",
                    }}
                    value={option.optionStatement}
                    onChange={(e) => updateQuestionOption(e, index, idx)}
                  />
                </div>
              </>
            ))}
          </div>
          <div
            style={{
              marginLeft: 30,
            }}
          >
            <button
              style={{
                backgroundColor: "#e7ddfe",
                border: "none",
                textDecoration: "none",
                padding: "10px 30px",
                color: "#36007B",
                borderRadius: 20,
                textTransform: "uppercase",
                fontSize: 11,
              }}
              onClick={() => addNewOption(index)}
            >
              Add new option
            </button>
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 60,
        }}
      >
        <button
          style={{
            backgroundColor: "#7E19AD",
            border: "none",
            textDecoration: "none",
            padding: "10px 30px",
            color: "white",
            borderRadius: 20,
            textTransform: "uppercase",
            fontSize: 11,
          }}
          onClick={() => addNewQuestion()}
        >
          Add new question
        </button>
      </div>
      <br />
      <br />
      <hr color="#36007B" />
      <div
        style={{
          marginTop: 30,
        }}
      >
        <button
          style={{
            backgroundColor: "#7E19AD",
            border: "none",
            textDecoration: "none",
            padding: "10px 30px",
            color: "white",
            borderRadius: 20,
            textTransform: "uppercase",
            fontSize: 11,
          }}
          onClick={() => saveQuiz()}
        >
          Save quiz
        </button>
        {quizId !== undefined && (
          <button
            style={{
              marginLeft: 20,
              backgroundColor: "#7E19AD",
              border: "none",
              textDecoration: "none",
              padding: "10px 30px",
              color: "white",
              borderRadius: 20,
              textTransform: "uppercase",
              fontSize: 11,
            }}
            onClick={() => deleteQuiz()}
          >
            Delete quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizDemo;
