import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuiz } from "../../fireabse-config";

const Home = () => {
  const [quizes, setQuizes] = useState([]);

  const getQuizes = async () => {
    setQuizes(await getAllQuiz());
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
    </div>
  );
};

export default Home;
