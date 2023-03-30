import { useEffect, useState } from "react";

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
  const [time, setTime] = useState(quiz.duration - 1);
  const [seconds, setSeconds] = useState(60);

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

  const myTimer = () => {
    console.log(time, seconds);
    if (seconds === 0) {
      setSeconds(59);
      setTime(time - 1);
    } else setSeconds(seconds - 1);
  };

  useEffect(() => {
    const interval = setInterval(myTimer, 1000);
    if (time === 0) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [time, seconds]);

  return (
    <div className="App">
      <div
        style={{
          margin: 5,
          padding: 5,
        }}
      >
        {time}:{seconds}
      </div>
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

      <div
        style={{
          margin: 5,
          padding: 5,
        }}
      >
        <button>Submit </button>
      </div>
    </div>
  );
};

export default App;
