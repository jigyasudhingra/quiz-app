import { useEffect, useState } from "react";
import { getAllQuiz } from "../../fireabse-config";
import "../../index.css";

const Home = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getQuizes = async () => {
    setLoading(true);
    setQuizes(await getAllQuiz());
    setLoading(false);
  };

  useEffect(() => {
    getQuizes();
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "Garet Heavy",
              fontSize: 16,
              letterSpacing: 0.4,
              color: "#752899",
            }}
          >
            QUIZZES
          </div>
          <div
            style={{
              display: "flex",
              gap: 30,
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "2% 20%",
            }}
          >
            {quizes.map((quiz) => {
              return (
                <div
                  key={quiz.id}
                  style={{
                    backgroundColor: "#ebe6f2",
                    padding: 25,
                    borderRadius: 10,
                    textAlign: "center",
                    maxWidth: 130,
                  }}
                >
                  <div
                    className="heading1"
                    style={{
                      textTransform: "uppercase",
                      fontSize: 10,
                    }}
                  >
                    <strong>{quiz.name}</strong>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      textTransform: "uppercase",
                      fontSize: 8,
                      color: "#752899",
                    }}
                  >
                    {quiz?.questions.length} Questions
                  </div>
                  <div
                    className="text1"
                    style={{
                      marginTop: 8,
                      fontSize: 10,
                    }}
                  >
                    {quiz.description}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        textTransform: "uppercase",
                        fontSize: 10,
                        letterSpacing: 0.4,
                      }}
                      onClick={() => {
                        window.location.href = "/play/" + quiz.id;
                      }}
                    >
                      <b>Play</b>
                    </button>
                    <span> ⎸ </span>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        textTransform: "uppercase",
                        fontSize: 10,
                        letterSpacing: 0.4,
                      }}
                      onClick={() => {
                        window.location.href = "/edit/" + quiz.id;
                      }}
                    >
                      <b>Edit</b>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
