import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../Timer/Timer";
import "./Quiz.scss";

const Quiz = ({ questions, setResult }) => {
  const navigate = useNavigate();
  const initialQuestion = Number(localStorage.getItem("currentQuestion")) || 0;
  const savedResult = JSON.parse(localStorage.getItem("result")) || {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: questions.length,
  };
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setLocalResult] = useState(savedResult);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [choices, setChoices] = useState([]);

  const { question, correct_answer, incorrect_answers } =
    questions[currentQuestion];

  useEffect(() => {
    if (questions.length > 0) {
      const allChoices = [correct_answer, ...incorrect_answers];
      setChoices(shuffle(allChoices));
      localStorage.setItem("currentQuestion", currentQuestion);
    }
  }, [correct_answer, currentQuestion, incorrect_answers, questions]);

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(result));
  }, [result]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correct_answer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setLocalResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeout(() => {
        setShowAnswerTimer(true);
      });
    } else {
      const finalResult = {
        ...result,
        score: finalAnswer ? result.score + 10 : result.score,
        correctAnswers: finalAnswer
          ? result.correctAnswers + 1
          : result.correctAnswers,
        wrongAnswers: finalAnswer
          ? result.wrongAnswers
          : result.wrongAnswers + 1,
      };
      setResult(finalResult);
      navigate("/result");
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("result");
    }
  };

  const handleTime = () => {
    setAnswer(false);
    onClickNext(false);
  };

  return (
    <div className="quiz-container">
      <>
        {showAnswerTimer && <Timer duration={5} onTime={handleTime} />}
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-question">/{questions.length}</span>
        <h2>{question}</h2>
        <ul>
          {choices.map((choice, index) => (
            <li
              onClick={() => onAnswerClick(choice, index)}
              key={choice}
              className={answerIdx === index ? "selected-answer" : null}
            >
              {choice}
            </li>
          ))}
        </ul>
        <div className="footer">
          <button
            onClick={() => onClickNext(answer)}
            disabled={answerIdx === null}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </>
    </div>
  );
};

export default Quiz;
