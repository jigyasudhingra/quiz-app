import React from "react";

const Result = ({ quiz, minute, seconds, result }) => {
  return (
    <div>
      <div
        style={{
          fontFamily: "Garet Heavy",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        RESULT
      </div>
      <div
        style={{
          margin: "1% 39%",
          borderRadius: 20,
          backgroundColor: "#E4D2F0",
          padding: "35px 35px",
        }}
      >
        <div
          style={{
            backgroundColor: "#CAB5DE",
            borderRadius: 20,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>Time Taken</div>
          <span
            style={{
              fontSize: 20,
              fontFamily: "Garet Heaavy",
              color: "#7E19AD",
            }}
          >
            |
          </span>
          <div>
            <b>{quiz.duration - minute - 1}</b> min <b>{60 - seconds}</b>{" "}
            seconds
          </div>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "#CAB5DE",
            borderRadius: 20,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>Marks Scored</div>
          <span
            style={{
              fontSize: 20,
              fontFamily: "Garet Heaavy",
              color: "#7E19AD",
            }}
          >
            |
          </span>
          <div>
            <b>{result}</b> out of <b>{quiz.questions.length}</b> marks
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
