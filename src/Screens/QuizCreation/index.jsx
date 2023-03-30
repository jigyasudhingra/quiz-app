import { useState } from "react";

const QuizCreation = () => {
  const [showInputFields, setShowInputFields] = useState(false);
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
    duration: "",
    questions: [],
  });

  const [questions, setQuestions] = useState([]);

  const [questionDetail, setQuestionDetail] = useState({
    statement: "",
    options: [],
  });

  const [showOptions, setShowOptions] = useState(false);
  const [questionOption, setQuestionOption] = useState("");

  const addNewQuestion = () => {
    if (questionOption !== "")
      setQuestionDetail({
        ...questionDetail,
        options: [questionOption],
      });
    if (questionDetail.statement !== "") {
      setQuestions([...questions, questionDetail]);
      setQuestionDetail({
        statement: "",
        options: [],
      });
    }
    setShowInputFields(true);
  };

  const addAnotherOption = () => {
    if (questionOption !== "") {
      setQuestionDetail({
        ...questionDetail,
        options: [...questionDetail?.options, questionOption],
      });
      setQuestionOption("");
    }
    setShowOptions(true);
  };

  console.log(questionDetail);
  return (
    <div>
      {questions?.map((i) => {
        return (
          <div>
            <input
              style={{
                margin: 5,
                padding: 5,
              }}
              type="text"
              value={i.statement}
            />
            <div
              style={{
                margin: 5,
                padding: 5,
              }}
            >
              {i?.options?.map((o) => (
                <input
                  style={{
                    margin: 5,
                    padding: 5,
                  }}
                  value={o}
                />
              ))}
            </div>
          </div>
        );
      })}
      {showInputFields && (
        <div
          style={{
            margin: 5,
            padding: 5,
          }}
        >
          <label>Statement:</label>
          <input
            type="text"
            value={questionDetail.statement}
            onChange={(e) =>
              setQuestionDetail({
                ...questionDetail,
                statement: e.target.value,
              })
            }
          />
          <label>Options:</label>
          {questionDetail?.options?.map((op, idx) => (
            <input
              type="text"
              value={op}
              onChange={(e) => {
                setQuestionDetail({
                  ...questionDetail,
                  options: [
                    ...questionDetail.options.slice(0, idx),
                    e.target.value,
                    ...questionDetail.options.slice(idx + 1),
                  ],
                });
              }}
            />
          ))}
          {showOptions && (
            <input
              type="text"
              value={questionOption}
              onChange={(e) => setQuestionOption(e.target.value)}
            />
          )}
          <button onClick={() => addAnotherOption()}>Add option</button>
        </div>
      )}
      <button onClick={() => addNewQuestion()}>Add new question</button>
    </div>
  );
};

export default QuizCreation;
