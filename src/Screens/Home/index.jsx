import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
