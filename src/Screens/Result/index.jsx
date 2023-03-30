import React from "react";
import { Link } from "react-router-dom";

const Result = ({ quiz, minute, seconds, result }) => {
  return (
    <div>
      Time Took: {quiz.duration - minute - 1} min {60 - seconds} seconds
      <br />
      Marks Scored: {result}
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Result;
