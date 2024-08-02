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

  function getIndicatorClass(value, maxValue) {
    const progress = (value / maxValue) * 100;
    if (progress < 50) {
      return "low";
    } else if (progress < 75) {
      return "medium";
    } else {
      return "high";
    }
  }

  function ScoreIndicator({ value, maxValue }) {
    const val = (value / maxValue) * 100;
    const deg = (180 / 100) * val;
    const indicatorClass = getIndicatorClass(value, maxValue);
    return (
      <div className={`indicator ${indicatorClass}`}>
        <span className="bar" style={{ transform: `rotate(${deg}deg)` }} />
        <span className="result">
          {value}/<span>{maxValue}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="results">
      <h3>Result</h3>
      <p>
        <ScoreIndicator
          value={result.score}
          maxValue={result.totalQuestions * 10}
        />
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
