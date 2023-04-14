import { useEffect, useState } from "react";
import Result from "../Result";
import { useParams } from "react-router-dom";
import { getQuizDetails } from "../../fireabse-config";

// const quizzes = [
//   {
//     name: "Test Quiz 1",
//     id: "Test Quiz 1",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry's",
//     duration: 20,
//     questions: [
//       {
//         statement:
//           "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//         ],
//       },
//       {
//         statement:
//           "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//         ],
//       },
//       {
//         statement:
//           "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//             selected: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//             selected: false,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//             selected: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//             selected: false,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Test Quiz 2",
//     id: "Test Quiz 2",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry's",
//     duration: 40,
//     questions: [
//       {
//         statement:
//           "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//         ],
//       },
//       {
//         statement:
//           "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//         ],
//       },
//       {
//         statement:
//           "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//         options: [
//           {
//             option:
//               "1. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "2. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: true,
//           },
//           {
//             option:
//               "3. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//           {
//             option:
//               "4. Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry",
//             correct: false,
//           },
//         ],
//       },
//     ],
//   },
// ];

const QuizPlay = () => {
  const [quiz, setQuiz] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isStart, setIsStart] = useState(true);
  const [time, setTime] = useState(quiz.duration - 1);
  const [seconds, setSeconds] = useState(59);

  const quizParams = useParams();

  const getQuiz = async () => {
    const temp = await getQuizDetails(quizParams.id);
    setQuiz(temp);
    setTime(temp.duration - 1);
  };

  useEffect(() => {
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if ((time === 0 && seconds === 0) || isStart === false) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, seconds, isStart]);

  const submitScore = () => {
    setIsStart(false);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: isStart ? "block" : "none",
        }}
      >
        <div
          style={{
            margin: "2% 45%",
            padding: 10,
            borderRadius: 20,
            backgroundColor: "#e7ddfe",
          }}
        >
          {time}:{seconds} left
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            gap: 100,
          }}
        >
          <button
            style={{
              border: "none",
              textDecoration: "none",
              background: "none",
              color: "#7E19AD",
              cursor: questionIndex === 0 ? "no-drop" : "pointer",
              fontSize: 50,
            }}
            onClick={() => prevQuestion()}
            disabled={questionIndex === 0}
          >
            {"<"}
          </button>
          <div
            style={{
              textAlign: "left",
              width: 600,
            }}
          >
            <b>
              <div>Ques. {questionIndex + 1}</div>
            </b>
            <br />
            <div>{quiz?.questions?.[questionIndex]?.statement}</div>
            {quiz?.questions?.[questionIndex]?.options?.map((i, idx) => (
              <div
                key={i.optionStatement}
                style={{
                  margin: 5,
                  borderRadius: 20,
                  backgroundColor:
                    selected?.[questionIndex] !== i ? "#f1defa" : "#e7ddfe",
                  padding: 15,
                  marginTop: 15,
                }}
                onClick={() => updateScore(i, idx)}
              >
                {i.optionStatement}
              </div>
            ))}
          </div>
          <button
            style={{
              border: "none",
              textDecoration: "none",
              background: "none",
              color: "#7E19AD",
              fontSize: 50,
              cursor:
                questionIndex === quiz?.questions?.length - 1
                  ? "no-drop"
                  : "pointer",
            }}
            onClick={() => nextQuestion()}
            disabled={questionIndex === quiz?.questions?.length - 1}
          >
            {">"}
          </button>
        </div>
        <div
          style={{
            margin: 5,
            padding: 5,
          }}
        >
          <button
            style={{
              border: "none",
              textDecoration: "none",
              background: "#7E19AD",
              color: "white",
              borderRadius: 20,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              fontSize: 10,
              marginTop: 30,
            }}
            onClick={() => submitScore()}
          >
            SUBMIT QUIZ{" "}
          </button>
        </div>
      </div>
      {!isStart && (
        <div>
          <Result
            quiz={quiz}
            minute={time}
            seconds={seconds}
            result={getScore()}
          />
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
