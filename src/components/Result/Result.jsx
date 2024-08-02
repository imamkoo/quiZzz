import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Result.scss";

const Result = ({ result, onTryAgain }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions: <span>{result.totalQuestions}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <div className="buttons">
        <button onClick={onTryAgain}>Try again</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Result;
