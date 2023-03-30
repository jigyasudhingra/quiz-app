import { useState } from "react";

const quizzes = [
  {
    name: "Test Quiz 1",
    id: "Test Quiz 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry's",
    duration: 20,
    questions: [
      {
        statement:
          "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
            selected: false,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
        ],
      },
      {
        statement:
          "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
            selected: false,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
        ],
      },
      {
        statement:
          "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
            selected: false,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    name: "Test Quiz 2",
    id: "Test Quiz 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry's",
    duration: 40,
    questions: [
      {
        statement:
          "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
        ],
      },
      {
        statement:
          "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
        ],
      },
      {
        statement:
          "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
        options: [
          {
            option:
              "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: true,
          },
          {
            option:
              "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
          {
            option:
              "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
            correct: false,
          },
        ],
      },
    ],
  },
];

const App = () => {
  const quiz = quizzes[0];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const prevQuestion = () => {
    if (questionIndex > 0) setQuestionIndex(questionIndex - 1);
  };

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < selected.length; i++)
      if (selected[i].correct) score += 1;

    return score;
  };

  const nextQuestion = () => {
    if (questionIndex < quiz.questions.length - 1)
      setQuestionIndex(questionIndex + 1);
  };

  const updateScore = (option) => {
    setSelectedOption(option);
    if (
      selected[selected.length - 1] !== option &&
      selected.length === questionIndex
    )
      setSelected([...selected, option]);
    else {
      let tempSelected = selected;
      tempSelected[questionIndex] = option;
      setSelected(tempSelected);
    }
  };

  return (
    <div className="App">
      <button onClick={() => prevQuestion()} disabled={questionIndex === 0}>
        Prev
      </button>
      <div>{quiz.questions[questionIndex].statement}</div>
      {quiz.questions[questionIndex].options.map((i, idx) => (
        <div
          key={i.option}
          style={{
            margin: 5,
            padding: 5,
            border: selected[questionIndex] === i ? "1px solid red" : "none",
          }}
          onClick={() => updateScore(i, idx)}
        >
          {i.option}
        </div>
      ))}
      <button
        onClick={() => nextQuestion()}
        disabled={questionIndex === quiz.questions.length - 1}
      >
        Next
      </button>
      {getScore()}
    </div>
  );
};

export default App;
