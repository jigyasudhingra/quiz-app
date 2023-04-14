import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuiz } from "../../fireabse-config";

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
      <Link to="/play">
        <button>Play</button>
      </Link>
      <Link to="/create">
        <button>Create New Quiz</button>
      </Link>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {quizes.map((quiz) => {
            return (
              <div
                key={quiz.id}
                style={{
                  border: "1px solid red",
                  padding: 5,
                  margin: 5,
                  cursor: "pointer",
                }}
              >
                <div>{quiz.name}</div>
                <div>{quiz.duration}</div>
                <div>{quiz.description}</div>
                <div>{quiz?.questions.length} Questions</div>
                <div>
                  <button
                    onClick={() => {
                      window.location.href = "/play/" + quiz.id;
                    }}
                  >
                    Play
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/edit/" + quiz.id;
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
